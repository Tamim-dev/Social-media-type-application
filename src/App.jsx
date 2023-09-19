import React from "react";
import {
    createRoutesFromElements,
    createBrowserRouter,
    Route,
    RouterProvider,
} from "react-router-dom";
import Registration from "./components/pages/registration/Registration";
import Login from "./components/pages/login/Login";
import Rotlayout from "./components/Rotlayout";
import Feed from "./components/pages/Feed";
import Profile from "./components/pages/Profile";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Registration />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/social" element={<Rotlayout />}>
                <Route path="profile" element={<Profile />}></Route>
                <Route path="feed" element={<Feed />}></Route>
            </Route>
        </Route>
    )
);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
