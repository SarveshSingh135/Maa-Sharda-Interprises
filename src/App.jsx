import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import GalleryPage from "./pages/GalleryPage";
import AboutPage from "./pages/AboutPage";

import ProductsPage from "./pages/products/ProductsPage";
import ElectricalPage from "./pages/products/ElectricalPage";
import AppliancesPage from "./pages/products/AppliancesPage";
import FurniturePage from "./pages/products/FurniturePage";
import ElectronicsPage from "./pages/products/ElectronicsPage";

import Dashboard from "./pages/admin/Dashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminFurniture from "./pages/admin/AdminFurniture";
import AdminElectronics from "./pages/admin/AdminElectronics";
import AdminAppliances from "./pages/admin/AdminAppliances";
import AdminElectrical from "./pages/admin/AdminElectrical";
import Adminoffers from "./pages/admin/Adminoffers";
import AdminContact from "./pages/admin/AdminContact";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SuccessPage from "./pages/SuccessPage";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminBanner from"./pages/admin/AdminBanner";
import AdminOrder from "./pages/admin/AdminOrder";
import AdminMessages from "./pages/admin/AdminMessages";
import UpiPayment from "./pages/UpiPaymentPage";
import Payment from "./pages/PaymentPage";
import MyOrders from "./pages/MyOrders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Website Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/electrical" element={<ElectricalPage />} />
        <Route path="/appliances" element={<AppliancesPage />} />
        <Route path="/furniture" element={<FurniturePage />} />
        <Route path="/electronics" element={<ElectronicsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/about" element={<AboutPage />} />
      

        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/furniture" element={<AdminFurniture />} />
        <Route path="/admin/electronics" element={<AdminElectronics />} />
        <Route path="/admin/appliances" element={<AdminAppliances />} />
        <Route path="/admin/electrical" element={<AdminElectrical />} />
        <Route path="/admin/offers" element={<Adminoffers />} />
        <Route path="/admin/contact" element={<AdminContact />} />
        <Route path="admin/Orders" element={<AdminOrder />} />
        <Route path="admin/messages" element={<AdminMessages />} />

        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/Banner" element={<AdminBanner />} />
        <Route path="/upi-payment" element={<UpiPayment />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/my-orders" element={<MyOrders />} />
                
      </Routes>
    </BrowserRouter>
  );
}

export default App;