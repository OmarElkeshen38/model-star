import React, { useState } from "react";

function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: "ModelStar",
    logoUrl: "",
    email: "support@modelstar.com",
    phone: "+201234567890",
    address: "القاهرة، مصر",
    paymentMethods: ["فيزا", "ماستر كارد", "الدفع عند الاستلام"],
  });

  const handleChange = (field, value) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSubmit = () => {
    console.log("تم حفظ الإعدادات:", settings);
    alert("تم حفظ الإعدادات بنجاح!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">إعدادات الموقع</h1>

      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        {/* إعدادات التواصل */}
        <div>
          <h2 className="text-lg font-semibold mb-4">إعدادات التواصل</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={settings.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="الهاتف"
              value={settings.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="العنوان"
              value={settings.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="border p-2 rounded col-span-full"
            />
          </div>
        </div>

        {/* إعدادات الدفع */}
        <div>
          <h2 className="text-lg font-semibold mb-4">طرق الدفع</h2>
          <textarea
            placeholder="أدخل طرق الدفع مفصولة بفاصلة"
            value={settings.paymentMethods.join(", ")}
            onChange={(e) =>
              handleChange(
                "paymentMethods",
                e.target.value.split(",").map((m) => m.trim())
              )
            }
            className="border p-2 rounded w-full"
          />
        </div>

        {/* زر الحفظ */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
          >
            حفظ التغييرات
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;
