import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeProvider from "./theme";

import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import HomePage from "./pages/private/home";
import ProfilePage from "./pages/private/profile";
import PrivateLayout from "./layout/private-layout";
import EventPage from "./pages/private/admin/event";
import EditEventPage from "./pages/private/admin/event/edit-event";
import CreateEventPage from "./pages/private/admin/event/create-event";
import EventInfoPage from "./pages/private/events";
import UserBookingsPage from "./pages/private/profile/bookings";
import AdminBookingsPage from "./pages/private/admin/bookings";
import UsersPage from "./pages/private/admin/users";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/profile"
            element={
              <PrivateLayout>
                <ProfilePage />
              </PrivateLayout>
            }
          />
          <Route
            path="/profile/bookings"
            element={
              <PrivateLayout>
                <UserBookingsPage />
              </PrivateLayout>
            }
          />
          <Route
            path="/"
            element={
              <PrivateLayout>
                <HomePage />
              </PrivateLayout>
            }
          />
          <Route
            path="/admin/events"
            element={
              <PrivateLayout>
                <EventPage />
              </PrivateLayout>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <PrivateLayout>
                <AdminBookingsPage />
              </PrivateLayout>
            }
          />
          <Route
            path="/admin/events/create"
            element={
              <PrivateLayout>
                <CreateEventPage />
              </PrivateLayout>
            }
          />
          <Route
            path="/admin/events/edit/:id"
            element={
              <PrivateLayout>
                <EditEventPage />
              </PrivateLayout>
            }
          />
          <Route
            path="/admin/users"
            element={
              <PrivateLayout>
                <UsersPage />
              </PrivateLayout>
            }
          />
          <Route
            path="/event/:id"
            element={
              <PrivateLayout>
                <EventInfoPage />
              </PrivateLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
