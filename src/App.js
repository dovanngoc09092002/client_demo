import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layout/defaultLayout";
import Home from "./pages/home";
import MakeFriends from "./pages/makeFriends";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/profile";
import ProfileId from "./pages/profileId";
import PostCMT from "./pages/PostCMT";
import Message from "./pages/messager";
import NeedLogin from "./pages/needLogin";
import Page404 from "./pages/page404";
import CreateVideo from "./pages/createVideo";
import { getCookie } from "./cookie";
import ViewForVideo from "./pages/ViewForVideo";
import ChangePassword from "./pages/changePassword";
import VideoForMe from "./pages/VideoForMe";
function App() {
  const isLoggedIn = getCookie("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <DefaultLayout>
                <Home />
              </DefaultLayout>
            ) : (
              <NeedLogin />
            )
          }
        />
        (
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <DefaultLayout>
                <Profile />
              </DefaultLayout>
            ) : (
              <NeedLogin />
            )
          }
        />
        )
        <Route
          path="/profile/:id"
          element={
            isLoggedIn ? (
              <DefaultLayout>
                <ProfileId />
              </DefaultLayout>
            ) : (
              <NeedLogin />
            )
          }
        />
        <Route
          path="/makefriends"
          element={
            isLoggedIn ? (
              <DefaultLayout>
                <MakeFriends />
              </DefaultLayout>
            ) : (
              <NeedLogin />
            )
          }
        />
        <Route
          path="/post/:id"
          element={
            isLoggedIn ? (
              <DefaultLayout>
                <PostCMT />
              </DefaultLayout>
            ) : (
              <NeedLogin />
            )
          }
        />
        <Route
          path="/mess/:id"
          element={
            isLoggedIn ? (
              <DefaultLayout>
                <Message />
              </DefaultLayout>
            ) : (
              <NeedLogin />
            )
          }
        />
        <Route
          path="/create/video"
          element={
            isLoggedIn ? (
              <DefaultLayout>
                <CreateVideo />
              </DefaultLayout>
            ) : (
              <NeedLogin />
            )
          }
        />
        <Route
          path="/view/video/:id"
          element={
            isLoggedIn ? (
              <DefaultLayout>
                <ViewForVideo />
              </DefaultLayout>
            ) : (
              <NeedLogin />
            )
          }
        />
        <Route
          path="/changepassword"
          element={
            isLoggedIn ? (
              <DefaultLayout>
                <ChangePassword />
              </DefaultLayout>
            ) : (
              <NeedLogin />
            )
          }
        />
        <Route
          path="/videome"
          element={
            isLoggedIn ? (
              <DefaultLayout>
                <VideoForMe />
              </DefaultLayout>
            ) : (
              <NeedLogin />
            )
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
