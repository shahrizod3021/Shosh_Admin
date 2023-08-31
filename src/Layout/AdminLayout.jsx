import {SideBar} from "../Component/SideBar.jsx";
import {Navbar} from "../Component/Navbar.jsx";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {GetData} from "../Service/service.js";
import {Unauthorized} from "../Component/Unauthorized.jsx";

export const AdminLayout = () => {
    const [data, setData] = useState({})
    const location = useLocation().pathname
    const navigate = useNavigate()
    const getAll = async () => {
        setData(await GetData(location))
        navigate(localStorage.getItem("path"))
    }
    useEffect(() => {
        getAll()
    }, [])
    return(
        <div>
            {localStorage.getItem("access-token") === null || data === null ? (
                <Unauthorized/>
            ) : (
                <>
                    <div className={"container-scroller"}>
                        <SideBar/>
                        <div className={"container-fluid page-body-wrapper "}>
                            <Navbar/>
                            <div className={"main-panel"}>
                                <div className={"content-wrapper"}>
                                    <Outlet/>
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            )}
        </div>
    )
}