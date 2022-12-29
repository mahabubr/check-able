import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import AddTask from "../Pages/AddTask/AddTask";
import CompleteTask from "../Pages/CompleteTask/CompleteTask";
import MyTask from "../Pages/MyTask/MyTask";
import UpdateTask from "../Pages/MyTask/UpdateTask";
import NotFound from "../Pages/Others/NotFound/NotFound";

export const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <NotFound />,
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <AddTask />
            },
            {
                path: '/my-task',
                element: <MyTask />
            },
            {
                path: '/complete-tasks',
                element: <CompleteTask />
            },
            {
                path: '/update-task/:id',
                element: <UpdateTask />,
                loader: ({ params }) => fetch(`https://check-able-server.vercel.app/my-task/${params.id}`)
            }
        ]
    }
])