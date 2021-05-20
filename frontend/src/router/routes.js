import ViewHome from "@/views/ViewHome";
import ViewLogin from "@/views/ViewLogin";
import ViewProfile from "@/views/ViewProfile";
import ViewSignup from "@/views/ViewSignup";

export const routes = [
  { path: "/", name: "Home", component: ViewHome },
  { path: "/login", name: "Login", component: ViewLogin },
  { path: "/signup", name: "Signup", component: ViewSignup },
  { path: "/profile", name: "Profile", component: ViewProfile },
];
