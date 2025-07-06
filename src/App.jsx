// import of reacttoastify UI library to create toast message
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import PrivateLayout from "./components/layout/PrivateLayout";
import CategoryList from "./pages/category/CategoryList";
import UpdateCategory from "./pages/category/UpdateCategory";
import NewCategory from "./pages/category/NewCategory";
import PostList from "./pages/post/PostList";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import PublicLayout from "./components/layout/PublicLayout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="categories/new-category" element={<NewCategory />} />
          <Route
            path="categories/update-category"
            element={<UpdateCategory />}
          />
          <Route path="posts" element={<PostList />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
