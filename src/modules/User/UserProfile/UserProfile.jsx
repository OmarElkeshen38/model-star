import React from "react";
import { Edit2, LogOut, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { logout } from "../../Authentication/authSlice";

function UserProfile() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // جلب بيانات اليوزر من الـ state
  const { user } = useSelector((state) => state.auth || {});

  function goToEditData() {
    navigate("/edit-user-data");
  }
  function goToEditPass() {
    navigate("/edit-user-password");
  }
  function handleLogout() {
    const ok = window.confirm(t("user.confirmLogout", "هل تريد تسجيل الخروج؟"));
    if (!ok) return;
    dispatch(logout());
    navigate("/auth/login");
  }

  // Chic Teal inline palette
  const COLORS = {
    primary: "#0B132B",
    accent: "#06B6D4",
    accentDark: "#0585A3",
    accent2: "#FF6B6B",
    muted: "#6B7280",
    white: "#FFFFFF",
  };

  if (!user) {
    return (
      <div
        className="container mx-auto px-4 py-16 mt-16 text-center"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <p className="text-gray-600" style={{ color: COLORS.muted }}>
          {t("user.noUser")}
        </p>
      </div>
    );
  }

  const avatarSrc =
    user.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=${encodeURIComponent(
      "06B6D4"
    )}&color=fff&rounded=true`;

  return (
    <div className="container mx-auto px-4 py-16 mt-16" dir={isRTL ? "rtl" : "ltr"}>
      <div
        className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10"
        role="region"
        aria-labelledby="profile-heading"
        style={{ border: `1px solid ${COLORS.primary}10` }}
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* صورة المستخدم */}
          <div className="flex-shrink-0">
            <img
              src={avatarSrc}
              alt={user.name || t("user.anonymous", "مستخدم")}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "data:image/svg+xml;utf8," +
                  encodeURIComponent(
                    `<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 128 128'><rect width='100%' height='100%' fill='${COLORS.softBg ||
                    "#F8FAFC"}'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='${COLORS.muted}' font-family='Arial, Helvetica, sans-serif' font-size='14'>No avatar</text></svg>`
                  );
              }}
              className="w-32 h-32 rounded-full border-4 shadow"
              style={{ borderColor: COLORS.accent }}
            />
          </div>

          {/* بيانات المستخدم */}
          <div className="flex-grow space-y-4 w-full">
            <h2
              id="profile-heading"
              className="text-2xl font-bold"
              style={{ color: COLORS.primary }}
            >
              {user.name}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm" style={{ color: COLORS.muted }}>
              <div>
                <p className="font-semibold" style={{ color: `${COLORS.muted}` }}>
                  {t("user.email")}:
                </p>
                <p>{user.email}</p>
              </div>
              <div>
                <p className="font-semibold" style={{ color: `${COLORS.muted}` }}>
                  {t("user.phone")}:
                </p>
                <p>{user.phone || t("user.noPhone")}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="font-semibold" style={{ color: `${COLORS.muted}` }}>
                  {t("user.address")}:
                </p>
                <p>{user.address || t("user.noAddress")}</p>
              </div>
            </div>

            {/* الأزرار */}
            <div className="flex flex-wrap gap-4 mt-6 items-center">
              <button
                onClick={goToEditData}
                className="flex items-center gap-2 px-5 py-2 rounded-md transition focus:outline-none focus-visible:ring-3"
                style={{
                  background: COLORS.accent,
                  color: COLORS.white,
                  boxShadow: "0 8px 20px rgba(6,182,212,0.12)",
                }}
                aria-label={t("user.editProfile")}
              >
                <Edit2 size={18} />
                {t("user.editProfile")}
              </button>

              <button
                onClick={goToEditPass}
                className="flex items-center gap-2 px-5 py-2 rounded-md transition focus:outline-none focus-visible:ring-3"
                style={{
                  background: "#F3F4F6",
                  color: COLORS.primary,
                  border: `1px solid ${COLORS.primary}10`,
                }}
                aria-label={t("user.changePassword")}
              >
                <KeyRound size={18} />
                {t("user.changePassword")}
              </button>

              <div className="ml-auto flex gap-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-5 py-2 rounded-md transition focus:outline-none focus-visible:ring-3"
                  style={{
                    background: "#FF6B6B",
                    color: COLORS.white,
                  }}
                  aria-label={t("user.logout")}
                >
                  <LogOut size={18} />
                  {t("user.logout")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
