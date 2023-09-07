import {GetOrders} from "../Service/service.js";
import {useEffect, useState} from "react";

export const Basic = () => {
    const [order, setOrder] = useState([])
    const getAll = async () => {
        setOrder(await GetOrders())
    }

    useEffect(() => {
        getAll()
    }, [])
    return (
        <div>
            <div className={"border-1"}>
                <div className={"card w-100"}>
                    <h4 className={"card-header"}>Здравствуйте, добро пожаловать на сайт <span
                        className={"font-italic"}>Modern Shosh Apartment.</span></h4>
                    <div className={"card-body p-4"}>
                        <p className={"card-"}>
                            Всего у вас <span className={"text-success"}>{order.length}</span> заказа</p>
                    </div>
                </div>

                <div className={"w-100 grid-margin stretch-card mt-4"}>
                    <div className={"card"}>
                        <div className={"card-body"}>
                            <h4 className={"card-title"}>
                                Список заказов
                            </h4>
                            <div className={"table-responsive"}>
                                <table className={"table table-bordered"}>
                                    <thead>
                                    <tr>
                                        <th>T/r</th>
                                        <th>Telefon raqam</th>
                                        <th>kattalar soni</th>
                                        <th>Kichik bolalar soni</th>
                                        <th>Xonalar soni</th>
                                        <th>Kelish sanasi</th>
                                        <th>Ketish sanasi</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {order.map((item, i) => (
                                        <>
                                            <tr >
                                                <td>{i+1}</td>
                                                <td>{item.phoneNumber}</td>
                                                <td>{item.older}</td>
                                                <td>{item.child}</td>
                                                <td>{item.sizeOfRooms}</td>
                                                <td>{item.comeTime.substring(0, 10)}</td>
                                                <td>{item.goTime.substring(0, 10)}</td>
                                            </tr>
                                        </>
                                    ))}
                                    </tbody>
                                </table>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}