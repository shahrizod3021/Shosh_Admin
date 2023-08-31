import {AddAdmin, DeleteAdmin, GetAllAdmin} from "../Service/service.js";
import {useEffect, useState} from "react";

export const Admin = () => {
    const [admins, setAdmins] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const getAll = async () => {
        setAdmins(await GetAllAdmin())
    }

    useEffect(() => {
        getAll()
    }, [])
    const addAdmin = async () => {
        const data = {
            name, email, password
        }
        await AddAdmin(data)
        await getAll()
    }
    return(
        <div>
            <div className={"table-responsive"}>
                <button className={"btn btn-light mb-3"} type={"button"} data-bs-target={'#addAdmin'} data-bs-toggle={"modal"} style={{float:"right"}}>Добавить администратора</button>
                <table className={"table table-bordered"}>
                    <thead >
                        <tr>
                            <th>Имя</th>
                            <th>Электронная почта</th>
                            <th>удалить</th>
                        </tr>
                    </thead>
                    <tbody>
                    {admins.map((item) => (
                        <>
                            <tr className={"text-white"}>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td className={"col-1"}><button className={"bg-transparent border-0"} onClick={() => DeleteAdmin(item.id)}><i className={"text-danger mdi mdi-delete"}></i></button></td>
                            </tr>
                        </>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="modal fade" id="addAdmin" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label htmlFor="name">введите имя</label>
                                <input type="text" value={name} onChange={e => setName(e.target.value)} id={"name"}
                                       name={"name"} className={"form-control"}
                                       placeholder={"Например: Новости в Modern Shosh"}/>
                                <label htmlFor="about" className={"mt-4"}>электронная почта</label>
                                <input type={"text"} id={"email"} className={"form-control"} name={"email"} value={email}
                                          placeholder={"введите адрес электронной почты"}
                                          onChange={event => setEmail(event.target.value)}></input>
                                <label htmlFor="about" className={"mt-4"}>введите пароль</label>
                                <input type={"text"} id={"password"} className={"form-control"} name={"password"} value={password}
                                       placeholder={"введите пароль"}
                                       onChange={event => setPassword(event.target.value)}></input>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Yopish</button>
                            <button type="button" className="btn btn-primary" data-bs-target={"#uploadPhoto"}
                                    data-bs-toggle={"modal"} onClick={() => addAdmin()}>Saqlash
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}