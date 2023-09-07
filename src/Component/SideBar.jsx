import {Link, useLocation, useNavigate} from "react-router-dom";
import shosh from '../assets/images/shosh.png'
import {GetData} from "../Service/service.js";
import {useEffect, useState} from "react";

export const SideBar = () => {
    const path = useLocation().pathname
    const [data, setData] = useState({})
    const navigate = useNavigate()
    const location = useLocation().pathname
    const menus = [
        {name: "Заказы", link: '/', icon: "mdi mdi-speedometer"},
        {name: "Новости и блоги", link: '/news', icon: "mdi mdi-new-box"},
        {name: "Запросы", link: '/request', icon: 'mdi mdi-receipt'},
        {name:"Aдмин", link: '/admin', icon: 'mdi mdi-account-circle-outline'}
    ]

    const getAll = async () => {
        setData(await GetData(location))
        navigate(localStorage.getItem("path"))
    }

    useEffect(() => {
        getAll()
    }, [])
    return (
        <div>
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <div
                    className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
                    <Link className="sidebar-brand brand-logo text-white" to="https://hotelshoshmodern.uz">Modern Shosh</Link>
                    <Link className="sidebar-brand  brand-logo-mini text-white" to={"https://hotelshoshmodern.uz"} ><p>HSHM</p></Link>
                </div>
                <ul className="nav">
                    <li className="nav-item profile">
                        <div className="profile-desc">
                            <div className="profile-pic">
                                <div className="count-indicator">
                                    <img className="img-xs rounded-circle " style={{width: "100%"}} src={shosh}
                                         alt=""/>
                                    <span className="count bg-success"></span>
                                </div>
                                <div className="profile-name">
                                    <h5 className="mb-0 font-weight-normal">{data.name}</h5>
                                    <span>ADMIN</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item nav-category">
                        <span className="nav-link">Разделы</span>
                    </li>
                    {menus.map((item) => (
                        <>
                            <li className={item.link === path ? "nav-item menu-items active" : "nav-item menu-items"}>
                                <Link className="nav-link" to={item.link}>
              <span className="menu-icon">
                <i className={item.icon}></i>
              </span>
                                    <span className="menu-title">{item.name}</span>
                                </Link>
                            </li>
                        </>
                    ))}
                </ul>
            </nav>
        </div>
    )
}