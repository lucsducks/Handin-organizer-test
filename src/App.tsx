import { useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./components/ProtectedRoute";
import { useInitializeAuth } from "./context/hook/useInitialuser.hook";
import { AuthLayout, DashboardLayout, Layout } from "./layout";
import { ForgotPasswordPage, Home, LoginPage, RegisterPage } from "./pages";
import LoadingPage from "./pages/LoadingPage";
import NotFoundPage from "./pages/auth/NotFoundPage";
import CategoriesPage from "./pages/dashboard/categories/CategoriesPage";
import ConferenceRoom from "./pages/dashboard/conferences/components/ConferenceRoom";
import RecordingsAdminPage from "./pages/dashboard/recordings-admin/RecordingsAdminPage";
import ResourceAdminRecordingPage from "./pages/dashboard/recordings-admin/ResourceAdminRecordingPage";
import RecordingAdminContentPage from "./pages/dashboard/recordings-admin/content/components/RecordingAdminContentPage";
import RecordingContentPage from "./pages/dashboard/recordings/RecordingContentPage";
import ResourceRecordingPage from "./pages/dashboard/recordings/ResourceRecordingPage";
import SubCategoriesPage from "./pages/dashboard/subcategories/SubCategoriesPage";
import SupportPage from "./pages/dashboard/user/SuportPage";
import { UserProfile } from "./pages/dashboard/user/components/UserProfilePage";
import { ROUTES } from "./types/routes/routes.type";
import OrganizerAdminPage from "./pages/dashboard/organizer/OrganizerAdminPage";
import OrganizerDetailAdminPage from "./pages/dashboard/organizer/OrganizerDetailAdminPage";
import RecordingsOrganizerPage from "./pages/dashboard/recordings/RecordingsOrganizerPage";
import ConferenceOrganizerPage from "./pages/dashboard/conferences/ConferenceOrganizerPage";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useInitializeAuth(() => {
    setIsLoading(false);
  });

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.PUBLIC.home} element={<Home />} />

        <Route element={<Layout />}>
          <Route path={ROUTES.PUBLIC.home} element={<Home />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route
            path={ROUTES.PUBLIC.login}
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path={ROUTES.PUBLIC.register}
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />

          <Route
            path={ROUTES.PUBLIC.forgotPassword}
            element={
              <PublicRoute>
                <ForgotPasswordPage />
              </PublicRoute>
            }
          />
        </Route>

        <Route
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route
            path={ROUTES.PRIVATE.dashboard}
            element={<Navigate to={ROUTES.PRIVATE.profile} />}
          />
          <Route
            path={ROUTES.PRIVATE.categories}
            element={<CategoriesPage />}
          />
          <Route
            path={ROUTES.PRIVATE.subcategories}
            element={<SubCategoriesPage />}
          />
          <Route
            path={ROUTES.PRIVATE.recordingorganizer}
            element={<RecordingsOrganizerPage />}
          />
          <Route
            path={ROUTES.PRIVATE.recordingsadmin}
            element={<RecordingsAdminPage />}
          />

          <Route
            path={ROUTES.PRIVATE.resourcesrecording}
            element={<ResourceRecordingPage />}
          />
          <Route
            path={ROUTES.PRIVATE.resourcesadminrecording}
            element={<ResourceAdminRecordingPage />}
          />
          <Route
            path={ROUTES.PRIVATE.conference}
            element={<ConferenceOrganizerPage />}
          />
          <Route
            path={ROUTES.PRIVATE.recordingContent}
            element={<RecordingContentPage />}
          />
          <Route
            path={ROUTES.PRIVATE.recordingadminContent}
            element={<RecordingAdminContentPage />}
          />
          <Route
            path={ROUTES.PRIVATE.Conferenceroom}
            element={<ConferenceRoom />}
          />
          <Route
            path={ROUTES.PRIVATE.organizeradmin}
            element={<OrganizerAdminPage />}
          />
          <Route
            path={ROUTES.PRIVATE.organizerdetailadmin}
            element={<OrganizerDetailAdminPage />}
          />
          <Route path={ROUTES.PRIVATE.support} element={<SupportPage />} />

          <Route path={ROUTES.PRIVATE.profile} element={<UserProfile />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
