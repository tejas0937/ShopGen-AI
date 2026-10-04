import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import LoginPromptModal from "./components/LoginPromptModal";

import {
  AuthProvider,
  useAuth,
} from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Recommendations from "./pages/Recommendations";

function PageLoader() {
  return (
    <div className="page-loader">
      <div className="loader-orb" />
      <p>Preparing ShopGen AI...</p>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const {
    user,
    isLoading,
    requestLoginPrompt,
  } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      requestLoginPrompt();
    }
  }, [isLoading, user, requestLoginPrompt]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!user) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
}

function GuestRoute({ children }) {
  const {
    user,
    isLoading,
  } = useAuth();

  if (isLoading) {
    return <PageLoader />;
  }

  if (user) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
}

function AppShell() {
  const {
    loginPromptOpen,
    closeLoginPrompt,
  } = useAuth();

  return (
    <BrowserRouter>
      <Navbar />

      <LoginPromptModal
        open={loginPromptOpen}
        onClose={closeLoginPrompt}
      />

      <main>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />

          <Route
            path="/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/products/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/recommendations"
            element={
              <ProtectedRoute>
                <Recommendations />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}

export default App;