import {useEffect, useState} from "react";
import {GetRequest, Remove} from "../Service/service.js";

export const Request = () => {
    const [request, setRequest] = useState([])
    const getAll = async () => {
        setRequest(await GetRequest())
    }

    useEffect(() => {
        getAll()
    }, [])

     return(
        <div>
            <div className={"table-responsive"}>
                <table className={"table table-bordered"}>
                    <thead>
                        <tr>
                            <th>T/r</th>
                            <th>имя</th>
                            <th>номер телефона</th>
                            <th>удалять</th>
                        </tr>
                    </thead>
                    <tbody>
                    {request.map((item, i) => (
                        <>
                            <tr>
                                <td>{i+1}</td>
                                <td>{item.name}</td>
                                <td>{item.phoneNumber}</td>
                                <td className={"col-1"}><button type={"button"} onClick={() => Remove(item.id)} className={"ml-4 border-0 bg-transparent"}><i className={"fas fa-trash text-danger"}></i></button></td>
                            </tr>

                        </>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}