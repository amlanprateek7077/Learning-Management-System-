import { Outlet, useNavigate } from "react-router-dom"
import "../CSS/homepage.css"
import NavBar from "../Components/NavBar"
import Footer from "../Components/Footer"

export default () => {
    const navigate = useNavigate()

    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}