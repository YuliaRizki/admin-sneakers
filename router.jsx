import HomePage from "./src/pages/HomePage";
import DetailPage from "./src/pages/DetailPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/:id",
        element: <DetailPage />,
    }
])

export default router;