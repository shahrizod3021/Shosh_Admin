import shosh from '../assets/images/shosh.png'
import '../assets/style.css'
import {useLocation, useNavigate} from "react-router-dom";
import {GetData} from "../Service/service.js";
import {useEffect, useState} from "react";
export const Navbar = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const location = useLocation().pathname
    const getAll = async () => {
        setUser(await GetData(location))
        navigate(localStorage.getItem("path"))
    }

    useEffect(() => {
        getAll()
    }, [])

    const logout = () => {
        localStorage.clear()
        navigate("/auth/login")
    }

    // const slideSide = () =>{
    //     document.getElementById('slide').classList.toggle('bg-transparent sidebar-icon-only')
    // }

    const slideRightSlide = () => {
        document.getElementById("sidebar").classList.toggle("active")
    }

    return(
        <div>
            <nav className="navbar p-0 fixed-top d-flex flex-row">
                <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
                    {/*<button  onClick={slideSide} className="minimize border-0 bg-transparent text-white" type="button"*/}
                    {/*        data-toggle="minimize">*/}
                    {/*    <span className="mdi mdi-menu"></span>*/}
                    {/*</button>*/}

                    <ul className="navbar-nav navbar-nav-right">
                        <li className="nav-item dropdown">
                            <a className="nav-link" id="profileDropdown" href="#" data-toggle="dropdown">
                                <div className="navbar-profile">
                                    <img className="img-sm rounded-circle w-100 "  src={shosh} alt="Shosh"/>
                                        <p className="mb-0 d-none d-sm-block navbar-profile-name me-5">{user.name}</p>
                                    <button onClick={() => logout()} className={"bg-transparent border-0"}>
                                        <i  className={"text-danger fas fa-right-from-bracket"}></i>
                                    </button>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <button onClick={slideRightSlide}  className="border-0 bg-transparent text-white d-lg-none" type="button"
                            data-toggle="offcanvas">
                        <span className="mdi mdi-format-line-spacing"></span>
                    </button>
                </div>
            </nav>
        </div>
    )
}