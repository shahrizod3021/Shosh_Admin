import {useState} from "react";
import {LoginAction} from "../service.js";
import {useNavigate} from "react-router-dom";

export const Login = () => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const login = async () => {
        const data = {
            username, password
        }
        await LoginAction(data)
        setTimeout(() => {
            navigate(localStorage.getItem("path"))
        }, 2000)
    }
    return (
        <div>
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="row w-100 m-0">
                        <div className="content-wrapper full-page-wrapper d-flex align-items-center auth login-bg">
                            <div className="card col-lg-4 mx-auto">
                                <div className="card-body px-5 py-5">
                                    <h3 className="card-title text-left mb-3">Авторизоваться</h3>
                                    <form>
                                        <div className="form-group">
                                            <label>Электронная почта</label>
                                            <input type="text" id={"username"} name={"username"} value={username} onChange={e => setUserName(e.target.value)}  className="form-control p_input"/>
                                        </div>
                                        <div className="form-group">
                                            <label>пароль *</label>
                                            <input id={"password"} name={"password"} value={password} onChange={e => setPassword(e.target.value)} type="text" className="form-control p_input"/>
                                        </div>
                                        <div className="text-center">
                                            <button type="button" onClick={() => login()}
                                                    className="btn btn-primary btn-block enter-btn">Log in
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}