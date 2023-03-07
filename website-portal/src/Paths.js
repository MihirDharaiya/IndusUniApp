import React from "react";
import { Route, Routes } from "react-router-dom";
import AddFaculty from "./pages/AddFaculty";
import RemoveFaculty from "./pages/RemoveFaculty";
import ReportedStudentList from "./pages/ReportedStudentList";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import WelcomePage from "./pages/WelcomePage";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import AllPastEvents from "./pages/AllPastEvents";
import ProtectedRoute from "./pages/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
const Paths = () => {
  return (
    <UserAuthContextProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <WelcomePage />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/Add-Faculty"
            element={
              <ProtectedRoute>
                <AddFaculty />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/Remove-Faculty"
            element={
              <ProtectedRoute>
                <RemoveFaculty />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/Reported-Student-List"
            element={
              <ProtectedRoute>
                <ReportedStudentList />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/All-Past-Events"
            element={
              <ProtectedRoute>
                <AllPastEvents />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/Forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserAuthContextProvider>
  );
};

export default Paths;
