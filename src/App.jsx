import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AuthContext } from "./context/AuthContext";

import FrontLayout from "./components/layout/front";
// import AdminLayout from "./pages/admin/dashboard";

import Account from "./pages/account/index";
import AboutusPage from "./pages/public/about";
import HomePage from "./pages/public/home";
import Login from "./pages/public/login";
import NotFoundPage from "./pages/public/not-found";
import CategoryPage from "./pages/public/category";
import PostPage from "./pages/public/post";
import Myposts from "./pages/user/my-posts";
import PostsPage from "./pages/public/posts";
import Register from "./pages/public/register";
import Dashboard from "./pages/admin/dashboard";
import CategoriesPage from "./pages/admin/categories";
// import AdminPostsPage from "./pages/admin/post";
import UsersPage from "./pages/admin/user";
import AdminLayout from "./components/layout/admin";
import Onecategory from "./pages/admin/categories/one-ctegory";
import AdminPostsPage from "./pages/admin/post";

function App() {
  const { isAuthenticated, role } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<FrontLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/posts/:postId" element={<PostPage />} />
            <Route path="/about-us" element={<AboutusPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/my-posts" element={<Myposts />} /> */}

            {isAuthenticated ? (
              <Route
                path="/my-posts"
                element={
                  isAuthenticated && role === "user" ? (
                    <Myposts />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            ) : (
              <Route path="*" element={<NotFoundPage />} />
            )}

            <Route
              path="/account"
              element={isAuthenticated ? <Account /> : <Navigate to="/login" />}
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />

          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route
              path="/categories/:oneCategoryId"
              element={<Onecategory />}
            />
            <Route path="/adminPost" element={<AdminPostsPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Route>

          {/* {isAuthenticated && role === "admin" ? (
            <Route path="/dashboard" element={<Dashboard />} />
          ) : null} */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
