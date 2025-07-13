import { createBrowserRouter } from "react-router";
import HomeLayOut from "../LayOut/HomeLayOut";
import Home from "../Pages/Home/Home/Home";
import AuthLayOut from "../LayOut/AuthLayOut";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoutes from "../Routes/PrivateRoutes";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashBoardLayOut from "../LayOut/DashBoardLayOut";
import MyParcel from "../Pages/DashBoard/MyParcel";
import Payment from "../Pages/DashBoard/Payment";
import PaymentHistroy from "../Pages/DashBoard/PaymetnHistroy/PaymentHistroy";
import BeARider from "../Pages/BeARider/BeARider";
import PendingRider from "../Pages/BeARider/PendingRider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayOut></HomeLayOut>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/coverage",
        element: <Coverage></Coverage>,
        loader: () => fetch("./serviceDistrict.json"),
      },
      {
        path: "beARider",
        element: (
          <PrivateRoutes>
            <BeARider></BeARider>
          </PrivateRoutes>
        ),
      },
      {
        path: "/sendParcel",
        loader: () => fetch("./serviceCenter.json"),
        element: (
          <PrivateRoutes>
            <SendParcel></SendParcel>
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayOut></AuthLayOut>,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },
      { path: "/register", element: <Register></Register> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashBoardLayOut></DashBoardLayOut>
      </PrivateRoutes>
    ),
    children: [
      {
        path: "myparcel",
        element: <MyParcel></MyParcel>,
      },
      {
        path: "payment/:id",
        element: <Payment></Payment>,
      },
      {
        path: "PaymentHistroy",
        element: <PaymentHistroy></PaymentHistroy>,
      },
      {
        path: "pendingApproval",
        element: <PendingRider></PendingRider>,
      },
    ],
  },
]);
export default router;
