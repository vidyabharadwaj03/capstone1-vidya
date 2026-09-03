import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import BrowseRecipesPage from "./pages/BrowseRecipesPage/BrowseRecipesPage";
import RecipeDetailPage from "./pages/RecipeDetailPage/RecipeDetailPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import CreateRecipePage from "./pages/CreateRecipePage/CreateRecipePage";
import EditRecipePage from "./pages/EditRecipePage/EditRecipePage";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShowSplash(false), 900);
    return () => clearTimeout(timeout);
  }, []);

  if (showSplash) return <SplashScreen />;

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/recipes" element={<BrowseRecipesPage />} />
        <Route path="/recipes/:id" element={<RecipeDetailPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/recipes/new"
          element={
            <ProtectedRoute>
              <CreateRecipePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/recipes/:id/edit"
          element={
            <ProtectedRoute>
              <EditRecipePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
