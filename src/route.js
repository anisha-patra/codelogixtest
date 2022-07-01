import Register from "./register";
import Login from "./login";
import Home from "./home";
import AdminHome from "./adminhome";
import AdminLogin from "./adminlogin";

const routes = [
    // { path: "/login", exact: true, component: Login },
    { path: "/adminhome", name: "", component: AdminHome },
    { path: "/home", name: "", component: Home },
    { path: "/adminlogin", name: "", component: AdminLogin },
    { path: "/register", name: "", component: Register },
    { path: "/login", name: "", component: Login },
];

export default routes;