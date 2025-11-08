// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          // ----- Navigation -----
          home: "Home",
          shop: "Shop",
          cart: "Cart",
          checkout: "Checkout",
          aboutUs: "About Us",
          contactUs: "Contact Us",
          languages: "Languages",
          joinUs: "Join Us",
          updateProfile: "Update Profile",
          dashboard: "Dashboard",
          logout: "Logout",

          // ----- Auth -----
          login: "Login",
          signup: "Sign Up",
          email: "Email",
          password: "Password",
          forgotPassword: "Forgot Password?",
          loginWithGoogle: "Continue with Google",
          noAccount: "Don’t have an account?",
          createAccount: "Create Account",
          alreadyHaveAccount: "Already have an account?",

          // ----- Home -----
          heroTitle: "Your Trusted Online Pharmacy",
          heroSubtitle:
            "We deliver authentic medicines, healthcare essentials, and wellness products — right to your door.",
          shopNow: "Shop Now",
          exploreProducts: "Explore Our Products",
          addToCart: "Add to Cart",
          popularProducts: "Popular Products",

          // ----- Cart -----
          yourCart: "Your Shopping Cart",
          emptyCart: "Your cart is empty",
          continueShopping: "Continue Shopping",
          total: "Total",
          quantity: "Quantity",
          price: "Price",
          remove: "Remove",
          checkoutNow: "Proceed to Checkout",

          // ----- Checkout -----
          paymentDetails: "Payment Details",
          payNow: "Pay Now",
          successPayment: "Payment Successful",
          failedPayment: "Payment Failed",
          thankYou: "Thank you for your purchase!",

          // ----- Invoice -----
          invoice: "Invoice",
          customer: "Customer",
          transactionId: "Transaction ID",
          date: "Date",
          purchasedItems: "Purchased Items",
          grandTotal: "Grand Total",
          downloadInvoice: "Download Invoice PDF",
          printInvoice: "Print Invoice",

          // ----- Footer -----
          rightsReserved: "All Rights Reserved.",
          privacyPolicy: "Privacy Policy",
          termsConditions: "Terms & Conditions",
          followUs: "Follow Us",
          getInTouch: "Get in Touch",
        },
      },

      // ✅ French
      fr: {
        translation: {
          home: "Accueil",
          shop: "Boutique",
          cart: "Panier",
          checkout: "Paiement",
          aboutUs: "À propos de nous",
          contactUs: "Contactez-nous",
          languages: "Langues",
          joinUs: "Rejoignez-nous",
          updateProfile: "Mettre à jour le profil",
          dashboard: "Tableau de bord",
          logout: "Se déconnecter",

          login: "Connexion",
          signup: "Inscription",
          email: "E-mail",
          password: "Mot de passe",
          forgotPassword: "Mot de passe oublié ?",
          loginWithGoogle: "Continuer avec Google",
          noAccount: "Vous n’avez pas de compte ?",
          createAccount: "Créer un compte",
          alreadyHaveAccount: "Vous avez déjà un compte ?",

          heroTitle: "Votre pharmacie en ligne de confiance",
          heroSubtitle:
            "Nous livrons des médicaments authentiques et des produits de santé directement à votre porte.",
          shopNow: "Achetez maintenant",
          exploreProducts: "Découvrez nos produits",
          addToCart: "Ajouter au panier",
          popularProducts: "Produits populaires",

          yourCart: "Votre panier",
          emptyCart: "Votre panier est vide",
          continueShopping: "Continuer vos achats",
          total: "Total",
          quantity: "Quantité",
          price: "Prix",
          remove: "Supprimer",
          checkoutNow: "Passer au paiement",

          paymentDetails: "Détails du paiement",
          payNow: "Payer maintenant",
          successPayment: "Paiement réussi",
          failedPayment: "Échec du paiement",
          thankYou: "Merci pour votre achat !",

          invoice: "Facture",
          customer: "Client",
          transactionId: "ID de transaction",
          date: "Date",
          purchasedItems: "Articles achetés",
          grandTotal: "Total général",
          downloadInvoice: "Télécharger la facture PDF",
          printInvoice: "Imprimer la facture",

          rightsReserved: "Tous droits réservés.",
          privacyPolicy: "Politique de confidentialité",
          termsConditions: "Termes et conditions",
          followUs: "Suivez-nous",
          getInTouch: "Contactez-nous",
        },
      },

      // ✅ Bangla (বাংলা)
      bn: {
        translation: {
          home: "হোম",
          shop: "দোকান",
          cart: "কার্ট",
          checkout: "চেকআউট",
          aboutUs: "আমাদের সম্পর্কে",
          contactUs: "যোগাযোগ করুন",
          languages: "ভাষা",
          joinUs: "আমাদের সাথে যোগ দিন",
          updateProfile: "প্রোফাইল আপডেট করুন",
          dashboard: "ড্যাশবোর্ড",
          logout: "লগআউট",

          login: "লগইন",
          signup: "সাইন আপ",
          email: "ইমেইল",
          password: "পাসওয়ার্ড",
          forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
          loginWithGoogle: "গুগল দিয়ে লগইন করুন",
          noAccount: "একাউন্ট নেই?",
          createAccount: "একাউন্ট তৈরি করুন",
          alreadyHaveAccount: "আগেই একাউন্ট আছে?",

          heroTitle: "আপনার বিশ্বস্ত অনলাইন ফার্মেসি",
          heroSubtitle:
            "আমরা সরবরাহ করি আসল ওষুধ, স্বাস্থ্যসেবা এবং ওয়েলনেস পণ্য — আপনার দরজায়।",
          shopNow: "এখনই কিনুন",
          exploreProducts: "আমাদের পণ্যসমূহ দেখুন",
          addToCart: "কার্টে যোগ করুন",
          popularProducts: "জনপ্রিয় পণ্য",

          yourCart: "আপনার কার্ট",
          emptyCart: "আপনার কার্ট খালি",
          continueShopping: "কেনাকাটা চালিয়ে যান",
          total: "মোট",
          quantity: "পরিমাণ",
          price: "মূল্য",
          remove: "মুছে ফেলুন",
          checkoutNow: "চেকআউটে যান",

          paymentDetails: "পেমেন্ট বিস্তারিত",
          payNow: "এখন পেমেন্ট করুন",
          successPayment: "পেমেন্ট সফল হয়েছে",
          failedPayment: "পেমেন্ট ব্যর্থ হয়েছে",
          thankYou: "আপনার ক্রয়ের জন্য ধন্যবাদ!",

          invoice: "চালান",
          customer: "গ্রাহক",
          transactionId: "লেনদেন আইডি",
          date: "তারিখ",
          purchasedItems: "কেনা পণ্য",
          grandTotal: "মোট টাকা",
          downloadInvoice: "চালান PDF ডাউনলোড করুন",
          printInvoice: "চালান প্রিন্ট করুন",

          rightsReserved: "সর্বস্বত্ব সংরক্ষিত।",
          privacyPolicy: "গোপনীয়তা নীতি",
          termsConditions: "শর্তাবলী",
          followUs: "আমাদের অনুসরণ করুন",
          getInTouch: "যোগাযোগ করুন",
        },
      },
    },
    fallbackLng: "en", // English default
    debug: false,
    interpolation: { escapeValue: false },
  });

export default i18n;
