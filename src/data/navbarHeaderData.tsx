import { AiOutlineLineChart, AiOutlineTransaction } from "react-icons/ai";
import { BsStopwatch } from "react-icons/bs";
import { GiCoinflip } from "react-icons/gi";
import { IoBarChartOutline, IoPeopleOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { RiCoupon4Line, RiProductHuntLine } from "react-icons/ri";
import { TiChartPieOutline } from "react-icons/ti";

export const data = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/about" },
  { id: 3, name: "Products", url: "/products" },
  { id: 4, name: "Contact", url: "/contact" },
];

export const admin = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/about" },
  { id: 3, name: "Products", url: "/products" },
  { id: 4, name: "Contact", url: "/contact" },
  { id: 5, name: "Dashboard", url: "/admin/dashboard" },
];

export const dashboard = [
  {
    url: "/admin/dashboard",
    icon: <MdOutlineDashboard />,
    heading: "Dashboard",
  },
  {
    url: "/admin/product",
    icon: <RiProductHuntLine />,
    heading: "Products",
  },
  {
    url: "/admin/transaction",
    icon: <AiOutlineTransaction />,
    heading: "Transactions",
  },
  {
    url: "/admin/customers",
    icon: <IoPeopleOutline />,
    heading:"Customers",
  },
];

export const charts = [
  {
    url: "/admin/chart/bar",
    icon: <IoBarChartOutline />,
    heading: "Bar",
  },
  {
    url: "/admin/chart/pie",
    icon: <TiChartPieOutline />,
    heading: "Pie",
  },
  {
    url: "/admin/chart/line",
    icon: <AiOutlineLineChart/>,
    heading: "Line",
  },
];

export const apps = [
  {
    url: "/admin/app/stopwatch",
    icon: <BsStopwatch/>,
    heading: "Stopwatch",
  },
  {
    url:"/admin/app/coupon",
    icon: <RiCoupon4Line />,
    heading: "Coupons",
  },
  {
    url: "/admin/app/toss",
    icon: <GiCoinflip/>,
    heading: "Toss",
  },
];