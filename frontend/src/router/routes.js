import ViewHome from "@/views/ViewHome";
import ViewProfile from "@/views/ViewProfile";

export const routes = [
  { path: "/", name: "Home", component: ViewHome },
  { path: "/profile", name: "Profile", component: ViewProfile },
];
