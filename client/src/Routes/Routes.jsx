import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        loader:() => fetch('http://localhost:5000/todo')
    }
])

export default router