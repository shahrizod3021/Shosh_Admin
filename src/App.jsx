import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AdminLayout} from "./Layout/AdminLayout.jsx";
import {Basic} from "./Pages/Basic.jsx";
import {Login} from "./Service/Auth/Login.jsx";
import {News} from "./Pages/News.jsx";
import {Admin} from "./Pages/Admin.jsx";
import {NotFoundPage} from "./Component/NotFoundPage.jsx";
import {Unauthorized} from "./Component/Unauthorized.jsx";
import {Request} from "./Pages/Request.jsx";

export const App = () => {
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<AdminLayout/>}>
                        <Route index element={<Basic/>}/>
                        <Route path={"/news"} element={<News/>}/>
                        <Route path={"/admin"} element={<Admin/>}/>
                        <Route path={"/request"} element={<Request/>}/>
                    </Route>
                    <Route path={"/auth/login"} element={<Login/>}/>
                    <Route path={"*"} element={<NotFoundPage/>}/>
                    <Route path={"/unauthorized"} element={<Unauthorized/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}