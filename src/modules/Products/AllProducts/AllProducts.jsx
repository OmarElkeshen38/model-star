import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  CATEGORIES_URLS,
  PRODUCTS_URLS,
  publicAxiosInstance,
} from "../../../Services/Urls/Urls";
import Pagination from "../../Shared/Pagination/Pagination";

function AllProducts() {
  const [productsList, setProductsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1); // ⬅️ الصفحة الحالية

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const productsPerPage = 6; // ⬅️ عدد المنتجات في الصفحة

  function goToProductDetails(productId) {
    navigate(`/product/${productId}`);
  }

  let getAllProducts = async () => {
    try {
      let response = await publicAxiosInstance.get(PRODUCTS_URLS.products);
      setProductsList(response?.data?.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  let getAllCategories = async () => {
    try {
      let response = await publicAxiosInstance.get(CATEGORIES_URLS.categories);
      setCategoriesList(response?.data?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  let productsByCategory = async (categoryId) => {
    setIsLoading(true);
    try {
      if (categoryId === "all") {
        await getAllProducts();
      } else {
        let response = await publicAxiosInstance.get(
          PRODUCTS_URLS.products_by_category(categoryId)
        );
        setProductsList(response?.data?.data?.data || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchParams({ category: categoryId });
    setPage(1);
    productsByCategory(categoryId);
  };

  useEffect(() => {
    getAllCategories();
    productsByCategory(initialCategory);
  }, [initialCategory]);

  // 🟢 Pagination logic
  const totalPages = Math.ceil(productsList.length / productsPerPage);
  const paginatedProducts = productsList.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-indigo-700 my-10 text-center">
        {t("nav.products")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1">
          <div className="bg-white p-5 shadow-lg rounded-xl border border-gray-100">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              {t("nav.shop")}
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleCategoryChange("all")}
                  className={`w-full text-start px-4 py-2 rounded-md transition font-medium ${
                    selectedCategory === "all"
                      ? "bg-indigo-600 text-white"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {i18n.language === "ar" ? "الكل" : "All"}
                </button>
              </li>

              {categoriesList.map((cat) => (
                <li key={cat._id}>
                  <button
                    onClick={() => handleCategoryChange(cat._id)}
                    className={`w-full text-start px-4 py-2 rounded-md transition font-medium ${
                      selectedCategory === cat._id
                        ? "bg-indigo-600 text-white"
                        : "text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    {i18n.language === "ar" ? cat.name_ar : cat.name_en}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Products */}
        <section className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              <div className="col-span-3 text-center py-10">
                <p className="text-indigo-600 text-4xl">
                  <i className="fa-solid fa-spinner animate-spin"></i>
                </p>
              </div>
            ) : paginatedProducts.length === 0 ? (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-600 text-lg">
                  {i18n.language === "ar"
                    ? "لا يوجد منتجات في هذا التصنيف"
                    : "No products found in this category"}
                </p>
              </div>
            ) : (
              paginatedProducts.map((product) => (
                <div
                  onClick={() => goToProductDetails(product._id)}
                  key={product._id}
                  className="bg-white cursor-pointer rounded-xl border border-gray-100 shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition duration-300 flex flex-col"
                >
                  <img
                    src={product.images?.[0]?.secure_url}
                    alt={product.name_ar}
                    className="w-full h-52 object-cover"
                  />
                  <div className="p-5 text-center flex flex-col justify-between gap-2 flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.name_ar}
                    </h3>
                    <p className="text-indigo-600 font-bold text-base">
                      {product.price} ج.م
                    </p>
                    <div className="flex justify-center gap-3 mt-3">
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition">
                        {t("products.cart", "أضف إلى السلة")}{" "}
                        <i className="fa-solid fa-cart-shopping mx-3"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 🟢 Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p)}
            />
          )}
        </section>
      </div>
    </div>
  );
}

export default AllProducts;
