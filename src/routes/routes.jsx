import { createBrowserRouter } from "react-router-dom";
import HomeContainer from "../components/home/HomeContainer";
import UserContainer from "../components/user/UserContainer";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeContainer />,
    },
    {
        path: "user/:id",
        element: <UserContainer />,
    }
])

export default router;