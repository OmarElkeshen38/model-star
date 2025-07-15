import React from "react";

function Checkout() {
  return (
    <div className="container mx-auto px-4 py-12 mt-4">
      <h2 className="text-3xl font-bold text-indigo-700 my-8 text-center">
        تأكيد الطلب
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">معلومات الشحن</h3>
          <form className="space-y-4">
            <input type="text" placeholder="الاسم الكامل" className="w-full border px-4 py-2 rounded-md" />
            <input type="text" placeholder="العنوان" className="w-full border px-4 py-2 rounded-md" />
            <input type="text" placeholder="المدينة / المنطقة" className="w-full border px-4 py-2 rounded-md" />
            <input type="tel" placeholder="رقم الهاتف" className="w-full border px-4 py-2 rounded-md" />

            <h4 className="text-lg font-medium mt-6">طريقة الدفع</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" defaultChecked />
                <span>الدفع عند الاستلام</span>
              </label>
              <label className="flex items-center gap-2 text-gray-400 cursor-not-allowed">
                <input type="radio" disabled />
                <span>بطاقة ائتمان (قريبًا)</span>
              </label>
            </div>
          </form>
        </div>

        {/* ملخص الطلب */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">ملخص الطلب</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex justify-between">
              <span>حذاء رياضي رجالي × 1</span>
              <span>699 ج.م</span>
            </li>
            <li className="flex justify-between">
              <span>حذاء كاجوال نسائي × 2</span>
              <span>1098 ج.م</span>
            </li>
            <hr />
            <li className="flex justify-between font-bold text-indigo-700">
              <span>الإجمالي</span>
              <span>1797 ج.م</span>
            </li>
          </ul>

          <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md text-lg font-semibold transition">
            تأكيد الطلب
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
