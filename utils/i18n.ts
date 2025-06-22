import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome_back: "Welcome Back",
      home: "Home",
      login: "Login",
      signup: "Sign Up",
      email: "Email",
      password: "Password",
      logout: "Logout",
      title: "Title",
      description: "Description",
      create: "Create",
      create_page_title: "Create New Item",
      update: "Update",
      update_page_title: "Update Item",
      dashboard: "Dashboard",
    },
  },
  ar: {
    translation: {
      welcome_back: "مرحبا بك",
      home: "الصفحة الرئيسية",
      login: "تسجيل الدخول",
      signup: "إنشاء حساب",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      logout: "تسجيل الخروج",
      title: "العنوان",
      description: "الوصف",
      create: "أنشئ",
      create_page_title: "أنشئ عنصر جديد",
      update: "تحديث",
      update_page_title: "تعديل العنصر",
      dashboard: "داشبورد",
    },
  },
};

i18n.use(initReactI18next).init({
  resources: resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  detection: {
    order: ["localStorage", "navigator"],
    caches: ["localStorage"],
  },
  react: { useSuspense: false },
});

export default i18n;
