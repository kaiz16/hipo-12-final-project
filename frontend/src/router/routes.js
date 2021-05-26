import ViewHome from "@/views/ViewHome";
import ViewProfile from "@/views/ViewProfile";
import ViewFavourite from '@/views/ViewFavourite'
export const routes = [
  { path: "/", name: "Home", component: ViewHome },
  { path: "/profile", name: "Profile", component: ViewProfile },
  { path: "/favourites", name: "Favourites", component: ViewFavourite },
];
