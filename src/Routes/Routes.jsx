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
import QueryDetails from "../Pages/QueryDetails/QueryDetails";
import MyRecommendations from "../Pages/MyRecommendations/MyRecommendations";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
        {
            path:"/",
            element:<Home></Home>,
            loader: () => fetch('https://swapitright-server.vercel.app/queries')
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
      path:"/myrecommendations",
      element:<PrivateRoutes><MyRecommendations></MyRecommendations></PrivateRoutes>,
  },

        {
          path:"/addqueries",
          element:<PrivateRoutes><AddQueries></AddQueries></PrivateRoutes>,
      },

      {
        path:"/updatequery/:id",
        element:<PrivateRoutes><UpdateQuery></UpdateQuery></PrivateRoutes>,
        loader: ({params}) => fetch(`https://swapitright-server.vercel.app/queries/${params.id}`)
    },

      {
        path:"/view-details/:id",
        element:<PrivateRoutes><QueryDetails></QueryDetails></PrivateRoutes>, 
    },

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