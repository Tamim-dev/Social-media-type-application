import React from "react";
import {
    createRoutesFromElements,
    createBrowserRouter,
    Route,
    RouterProvider,
} from "react-router-dom";
import Registration from "./components/pages/registration/Registration";
import Login from "./components/pages/login/Login";
import Rotlayout from "./components/rotlayout/Rotlayout";
import Feed from "./components/pages/feed/Feed";
import Profile from "./components/pages/profile/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Friends from "./components/friend/Friends";
import Post from "./components/post/Post";
import User from "./components/user/User";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Registration />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/social" element={<Rotlayout />}>
                <Route path="profile" element={<Profile />}>
                    <Route path="friend" element={<Friends />}></Route>
                    <Route path="user" element={<User />}></Route>
                    <Route path="post" element={<Post />}></Route>
                </Route>
                <Route path="feed" element={<Feed />}></Route>
            </Route>
        </Route>
    )
);

const App = () => {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />
            <RouterProvider router={router} />
        </>
    );
};

export default App;
