import React from "react";
import {
    createRoutesFromElements,
    createBrowserRouter,
    Route,
    RouterProvider,
} from "react-router-dom";
import Registration from "./assets/components/pages/registration/Registration";
import Login from "./assets/components/pages/login/Login";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Registration />}></Route>
            <Route path="/login" element={<Login />}></Route>
        </Route>
    )
);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
