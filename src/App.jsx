// import of reacttoastify UI library to create toast message
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";

import { Route, Routes } from "react-router-dom";

import PrivateLayout from "./components/layout/PrivateLayout";
//home modal --------------->
import Home from "./pages/home";
//category modal --------------->
import CategoryList from "./pages/category/CategoryList";
import UpdateCategory from "./pages/category/UpdateCategory";
import NewCategory from "./pages/category/NewCategory";
//post modal --------------->
import PostList from "./pages/post/PostList";
import NewPost from "./pages/post/NewPost";
import DetailPost from "./pages/post/DetailPost";
import UpdatePost from "./pages/post/UpdatePost";
//profile modal --------------->
import Profile from "./pages/Profile";
//settings modal --------------->
import Settings from "./pages/Settings";

import PublicLayout from "./components/layout/PublicLayout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateLayout />}>
          {/* //home modal -------------------------------------------------- home modal> */}
          <Route path="/" element={<Home />} />
          {/* //category modal -------------------------------------------------- category modal> */}
          <Route path="categories" element={<CategoryList />} />
          <Route path="categories/new-category" element={<NewCategory />} />
          <Route
            path="categories/update-category/:id"
            element={<UpdateCategory />}
          />
          {/* //post modal -------------------------------------------------- post modal> */}
          <Route path="posts" element={<PostList />} />
          <Route path="posts/new-post" element={<NewPost />} />
          <Route path="posts/detail-post" element={<DetailPost />} />
          <Route path="posts/update-post" element={<UpdatePost />} />
          {/* //profile modal -------------------------------------------------- profile modal> */}
          <Route path="profile" element={<Profile />} />
          {/* //settings modal -------------------------------------------------- settings modal> */}
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
