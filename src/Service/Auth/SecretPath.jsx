import {useState} from "react";
import {AddAdmin} from "../service.js";
import {useNavigate} from "react-router-dom";

export const SecretPath = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const add = async () => {
        const data= {
            name, email, password
        }
        await AddAdmin(data)
        setTimeout(() => {
            navigate("/auth/login")
        }, 1000)

    }
    return(
        <div>
            <div className={"container"}>
                <button className={"btn btn-primary"} data-bs-toggle={"modal"} data-bs-target={"#add"}>
                    Add +
                </button>
            </div>
            <div className="modal fade" id="add" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Добавить администратора</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label htmlFor="name">введите имя</label>
                                <input type="text" value={name} onChange={e => setName(e.target.value)} id={"name"}
                                       name={"name"} className={"form-control"}
                                       placeholder={"Например: Admin"}/>
                                <label htmlFor="about" className={"mt-4"}>электронная почта</label>
                                <input type={"text"} id={"email"} className={"form-control"} name={"email"}
                                       value={email}
                                       placeholder={"введите адрес электронной почты"}
                                       onChange={event => setEmail(event.target.value)}></input>
                                <label htmlFor="about" className={"mt-4"}>введите пароль</label>
                                <input type={"text"} id={"password"} className={"form-control"} name={"password"}
                                       value={password}
                                       placeholder={"введите пароль"}
                                       onChange={event => setPassword(event.target.value)}></input>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">закрывать
                            </button>
                            <button type="button" className="btn btn-primary" data-bs-target={"#uploadPhoto"}
                                    data-bs-toggle={"modal"} onClick={() => add()}>Сохранять
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}