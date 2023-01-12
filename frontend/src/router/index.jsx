import {createBrowserRouter} from "react-router-dom";
import Home from "../components/Home";
import NotFound from "../components/NotFound";
import Login from "../components/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement:<NotFound />,
    },
    {
        path: "login",
        element: <Login />,
    }
]);
export default router;