import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

//eresr

export default function Layout() {
    return (
        <>
            <NavBar />
            <Outlet />  {/* represents current page displayed */} 
        </>
    )
}