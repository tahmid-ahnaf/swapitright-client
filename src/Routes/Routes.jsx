import { createBrowserRouter} from "react-router-dom";
import Root from "../layout/Root";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import MyQueries from "../Pages/MyQueries/MyQueries";
import AddQueries from "../Pages/AddQueries/AddQueries";
import UpdateQuery from "../Pages/UpdateQuery/UpdateQuery";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
        {
            path:"/",
            element:<Home></Home>,
            loader: () => fetch('http://127.0.0.1:5000/queries')
        },

      //   {
      //     path:"/allitems",
      //     element:<AllItems></AllItems>,
      //     loader: () => fetch('https://b9a10-server-side-tahmid-ahnaf.vercel.app/items')
      // },

      {
        path:"/myqueries",
        element:<PrivateRoutes><MyQueries></MyQueries></PrivateRoutes>,
    },

        {
          path:"/addqueries",
          element:<PrivateRoutes><AddQueries></AddQueries></PrivateRoutes>,
      },

      {
        path:"/updatequery/:id",
        element:<PrivateRoutes><UpdateQuery></UpdateQuery></PrivateRoutes>,
        loader: ({params}) => fetch(`http://127.0.0.1:5000/queries/${params.id}`)
    },

  //     {
  //       path:"/view-details/:id",
  //       element:<PrivateRoutes><ItemDetails></ItemDetails></PrivateRoutes>,
  //       loader: ({params}) => fetch(`https://b9a10-server-side-tahmid-ahnaf.vercel.app/items/${params.id}`) 
  //   },

  //   {
  //     path:"/itemsofsubcategory/:id",
  //     element:<ItemofCategory></ItemofCategory>,
  //     loader: ({params}) => fetch(`https://b9a10-server-side-tahmid-ahnaf.vercel.app/itemsBySubcategory/${params.id}`) 
  // },

        {
          path:"/register",
          element:<Register></Register>,
      },

      {
        path:"/login",
        element: <Login></Login>,
    },
    ],
  },
]);

export default router;