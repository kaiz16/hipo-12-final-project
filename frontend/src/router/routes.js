import ViewHome from "@/views/ViewHome";
import ViewLogin from "@/views/ViewLogin";
import ViewProfile from "@/views/ViewProfile";

export const routes = [
  { path: "/", name: "Home", component: ViewHome },
  { path: "/login", name: "Login", component: ViewLogin },
  { path: "/profile", name: "Profile", component: ViewProfile },
];
