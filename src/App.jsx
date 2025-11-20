import * as React from "react";

import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

// root page
import {
  HomePage,
  AboutPage,
  EventPage,
  ProjectPage,
  SingleBlogPage,
  ProfilePage,
  SingleDonationPage,
  PaymentDonationPage,
  PaymentSuccessPage,
  BlogPage as RootBlogPage,
  DonationPage as RootDonationPage,
  NondeptPage,
  DppPage,
  CdsiPage,
  HrdPage,
  ComperPage,
  BismarPage,
  ProposalPage,
} from "./page/root";

// dashboard page
import {
  AddBlogPage,
  BlogCategories,
  BlogPage,
  CampaignCategories,
  DashboardPage,
  DetailBlogPage,
  DonationHistory,
  CampaignPage,
  EditBlogPage,
  SoonDashboardPage,
  UserPage,
  ProposalManagementPage,
  EventManagementPage,
  VolunteerPage,
} from "./page/dashboard";

// authentication page
import {
  ForgotPasswordPage,
  GoogleCallbackPage,
  LoginPage,
  RegisterPage,
  VerifyPage,
} from "./page/auth";

//error page
import ComingSoon from "./page/ComingSoon";
import NotFoundPage from "./page/NotFoundPage";

// protected route
import { ProtectedDashboard, ProtectedRoles, ProtectedToken } from "./routes";
import ChatbotPage from "./page/root/ChatbotPage";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return;
};

const ROLES = {
  admin: "admin",
  bismar: "bismar",
  copywriter: "copywriter",
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/tentang-kami" element={<AboutPage />} />
        <Route path="/nondept" element={<NondeptPage />} />
        <Route path="/cdsi" element={<CdsiPage />} />
        <Route path="/bismar" element={<BismarPage />} />
        <Route path="/dpp" element={<DppPage />} />
        <Route path="/hrd" element={<HrdPage />} />
        <Route path="/comper" element={<ComperPage />} />
        <Route path="/donasi" element={<RootDonationPage />} />
        <Route path="/artikel" element={<RootBlogPage />} />
        <Route path="/artikel/:slug" element={<SingleBlogPage />} />
        <Route path="/donasi/:slug" element={<SingleDonationPage />} />
        <Route path="/proposal" element={<ProposalPage />} />
        <Route
          path="/donasi/:slug/pembayaran"
          element={<PaymentDonationPage />}
        />
        <Route
          path="/donasi/pembayaran/sukses"
          element={<PaymentSuccessPage />}
        />

        <Route element={<ProtectedToken />}>
          <Route path="/chatbot/:slug" element={<ChatbotPage />} />
          <Route path="/profil/:id" element={<ProfilePage />} />

          <Route element={<ProtectedDashboard />}>
            <Route path="/admin/dashboards" element={<DashboardPage />} />

            <Route element={<ProtectedRoles allowedRoles={[ROLES.admin]} />}>
              <Route path="/admin/dashboard/user" element={<UserPage />} />
              <Route
                path="/admin/dashboard/proposal"
                element={<ProposalManagementPage />}
              />
            </Route>

            <Route
              element={
                <ProtectedRoles
                  allowedRoles={[ROLES.admin, ROLES.copywriter]}
                />
              }
            >
              <Route path="/admin/dashboard/blog" element={<BlogPage />} />
              <Route
                path="/admin/dashboard/category/blog"
                element={<BlogCategories />}
              />
              <Route
                path="/admin/dashboard/blog/add"
                element={<AddBlogPage />}
              />
              <Route
                path="/admin/dashboard/blog/edit/:slug"
                element={<EditBlogPage />}
              />
              <Route
                path="/admin/dashboard/blog/detail/:slug"
                element={<DetailBlogPage />}
              />
            </Route>

            <Route
              element={
                <ProtectedRoles allowedRoles={[ROLES.admin, ROLES.bismar]} />
              }
            >
              <Route
                path="/admin/dashboard/product"
                element={<SoonDashboardPage />}
              />
              <Route
                path="/admin/dashboard/order-list"
                element={<SoonDashboardPage />}
              />

              <Route
                path="/admin/dashboard/campaign"
                element={<CampaignPage />}
              />
              <Route
                path="/admin/dashboard/category/campaign"
                element={<CampaignCategories />}
              />
              <Route
                path="/admin/dashboard/donation/:slug"
                element={<DonationHistory />}
              />
            </Route>

            <Route
              element={
                <ProtectedRoles allowedRoles={[ROLES.admin]} />
              }
            >
              <Route path="/admin/dashboard/event" element={<EventManagementPage />} />
              <Route path="/admin/dashboard/volunteer" element={<VolunteerPage />} />
            </Route>



          </Route>
        </Route>

        <Route path="/masuk" element={<LoginPage />} />
        <Route path="/daftar" element={<RegisterPage />} />
        <Route path="/lupa-kata-sandi" element={<ForgotPasswordPage />} />
        <Route path="/verifikasi" element={<VerifyPage />} />
        <Route path="/auth/google" element={<GoogleCallbackPage />} />

        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
