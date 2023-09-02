import shosh from '../assets/images/shosh.png'
import {useEffect, useState} from "react";
import {AddNews, DeleteNews, Edit, GetNews, UploadPhoto} from "../Service/service.js";
import {Apis} from "../Service/Apis.js";
import axios from "axios";
import {BaseUrl} from "../Service/BaseUrl.js";
import toast from "react-hot-toast";

export const News = () => {
    const [uzName, setName] = useState('')
    const [ruName, setRuName] = useState('')
    const [engName, setEngName] = useState('')
    const [uzAbout, setUzAbout] = useState('')
    const [ruAbout, setRuAbout] = useState('')
    const [engAbout, setEngAbout] = useState('')
    const [news, setNews] = useState([])
    const [description, setDescription] = useState('')
    const [id, setId] = useState('')
    const [img, setImg] = useState('')
    const getAll = async () => {
        setNews(await GetNews())
    }

    useEffect(() => {
        getAll()
    }, [])
    const addNews = async () => {
        const data = {
            uzName, ruName, engName, uzAbout, ruAbout, engAbout
        }
        await AddNews(data)
        await getAll()
        setName("")
        setEngAbout("")
        setUzAbout("")
    }

    const editNews = async () => {
        const data = {
            uzName, ruName, engName, uzAbout, ruAbout, engAbout
        }
        await Edit(id, data)
        setName("")
        setRuName("")
        setEngName("")
        setEngAbout("")
        setRuAbout("")
        setUzAbout("")
    }
    const uploadNewsPhoto = async () => {
        let img = document.getElementById("img").files[0]
        const formData = new FormData()
        formData.append("photo", img)
        await UploadPhoto(formData)
        const photoId = localStorage.getItem("photoId")
        const res = await axios.put(BaseUrl + Apis.blogs + "/upload/" + localStorage.getItem("newsId") + "?photoId=" + photoId)
        setTimeout(() => {
            window.location.reload()
        }, 1000)
        setName("")
        setRuName("")
        setEngName("")
        setEngAbout("")
        setRuAbout("")
        setUzAbout("")
        return toast.success(res.data.message, {duration: 4000})

    }

    const catching = (desc, img) => {
        setDescription(desc)
        setImg(img)
    }

    return (
        <div>
            <button className={'btn btn-primary mb-3'} data-bs-target={"#addNews"} data-bs-toggle={"modal"}><i
                className={"mdi mdi-new-box mt-2"}></i>Добавить новость
            </button>
            <div className={"row row-cols-1 row-cols-md-3 g-4"}>
                {news.map((item) => (
                    <>
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">{item.ruName.toUpperCase()}</h4>
                                <div className="item">
                                    <button data-bs-target={"#uploadPhoto"} onClick={() => localStorage.setItem("newsId", item.id)} data-bs-toggle={"modal"} className={"border-0 bg-transparent w-100 p-0"}>
                                        <img src={Apis.getContent + item.photoId} className={"w-100"}
                                             style={{height: "25vh"}} alt={item.ruName}/>
                                    </button>
                                </div>
                                <div className="d-flex py-4">
                                    <div className="preview-list w-100">
                                        <div className="preview-item p-0">
                                            <div className="preview-thumbnail">
                                                <img src={shosh} className="rounded-circle" alt=""/>
                                            </div>
                                            <div className="preview-item-content d-flex flex-grow">
                                                <div className="flex-grow">
                                                    <div
                                                        className="d-flex d-md-block d-xl-flex justify-content-between">
                                                        <h6 className="preview-subject">{item.ruName}</h6>
                                                    </div>
                                                    <p className="text-muted">{item.ruAbout.substring(0, 30)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className={"btn btn-light me-2"} type={"button"} data-bs-target={"#more"}
                                        onClick={() => catching(item.ruAbout, item.photoId)}
                                        data-bs-toggle={"modal"}>Более...
                                </button>
                                <button className={"btn btn-danger me-2"} type={"button"}
                                        onClick={() => DeleteNews(item.id)}><i className={"fas fa-trash"}></i>
                                </button>
                                <button data-bs-target={"#edit"} onClick={() => setId(item.id)} data-bs-toggle={"modal"} className={"btn btn-warning"}><i className={"fa-solid fa-pencil"}></i></button>
                            </div>
                        </div>

                    </>
                ))}
            </div>
            <div className="modal fade" id="addNews" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Добавить новость</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label htmlFor="name">Yanglikni kiriting (uzb)</label>
                                <input type="text" value={uzName} onChange={e => setName(e.target.value)} id={"name"}
                                       name={"name"} className={"form-control"}
                                       placeholder={"M.n: Modern Shosh da yangilik"}/>
                                <label htmlFor="name" className={"mt-4"}>Введите новости (rus)</label>
                                <input type="text" value={ruName} onChange={e => setRuName(e.target.value)} id={"name"}
                                       name={"name"} className={"form-control"}
                                       placeholder={"M.n: Modern Shosh da yangilik"}/>
                                <label htmlFor="name" className={"mt-4"}>Add News (eng)</label>
                                <input type="text" value={engName} onChange={e => setEngName(e.target.value)} id={"name"}
                                       name={"name"} className={"form-control"}
                                       placeholder={"M.n: Modern Shosh da yangilik"}/>
                                <label htmlFor="uzAbout" className={"mt-4"}>Yanglik haqida batafsil (uzb)</label>
                                <textarea rows={10} id={"uzAbout"} className={"form-control"} name={"uzAbout"} value={uzAbout}
                                          placeholder={"batafsil "}
                                          onChange={event => setUzAbout(event.target.value)}></textarea>
                                <label htmlFor="ruAbout" className={"mt-4"}>
                                    Подробнее о Новости (rus)</label>
                                <textarea rows={10} id={"ruAbout"} className={"form-control"} name={"ruAbout"} value={ruAbout}
                                          placeholder={"подробности ... "}
                                          onChange={event => setRuAbout(event.target.value)}></textarea>
                                <label htmlFor="engAbout" className={"mt-4"}>More about News (eng)</label>
                                <textarea rows={10} id={"engAbout"} className={"form-control"} name={"engAbout"} value={engAbout}
                                          placeholder={"more ...  "}
                                          onChange={event => setEngAbout(event.target.value)}></textarea>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Yopish</button>
                            <button type="button" className="btn btn-primary" data-bs-target={"#uploadPhoto"}
                                    data-bs-toggle={"modal"} onClick={() => addNews()}>Saqlash
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="edit" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Pедактировать новость</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label htmlFor="name">Yanglikni taxrirlang (uzb)</label>
                                <input type="text" value={uzName} onChange={e => setName(e.target.value)} id={"name"}
                                       name={"name"} className={"form-control"}
                                       placeholder={"M.n: Modern Shosh da yangilik"}/>
                                <label htmlFor="name" className={"mt-4"}>редактировать новости (rus)</label>
                                <input type="text" value={ruName} onChange={e => setRuName(e.target.value)} id={"name"}
                                       name={"name"} className={"form-control"}
                                       placeholder={"M.n: Modern Shosh da yangilik"}/>
                                <label htmlFor="name" className={"mt-4"}>edit News (eng)</label>
                                <input type="text" value={engName} onChange={e => setEngName(e.target.value)} id={"name"}
                                       name={"name"} className={"form-control"}
                                       placeholder={"M.n: Modern Shosh da yangilik"}/>
                                <label htmlFor="uzAbout" className={"mt-4"}>Yanglik haqida batafsil (uzb)</label>
                                <textarea rows={10} id={"uzAbout"} className={"form-control"} name={"uzAbout"} value={uzAbout}
                                          placeholder={"batafsil "}
                                          onChange={event => setUzAbout(event.target.value)}></textarea>
                                <label htmlFor="ruAbout" className={"mt-4"}>
                                    Подробнее о Новости (rus)</label>
                                <textarea rows={10} id={"ruAbout"} className={"form-control"} name={"ruAbout"} value={ruAbout}
                                          placeholder={"подробности ... "}
                                          onChange={event => setRuAbout(event.target.value)}></textarea>
                                <label htmlFor="engAbout" className={"mt-4"}>More about News (eng)</label>
                                <textarea rows={10} id={"engAbout"} className={"form-control"} name={"engAbout"} value={engAbout}
                                          placeholder={"more ...  "}
                                          onChange={event => setEngAbout(event.target.value)}></textarea>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">закрывать</button>
                            <button type="button" className="btn btn-primary " data-bs-dismiss="modal" onClick={() => editNews()}>Сохранять
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="uploadPhoto" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Процесс хранения изображений</h1>
                            <button className={"bg-transparent border-0"} data-bs-dismiss={"modal"}>
                                <i className={"text-white fa-solid fa-x"}></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className={"col-12"} style={{height: '16%', borderStyle: 'dashed'}}>
                                <label className={"w-100 d-flex flex-column"} style={{height: '100%'}}
                                       htmlFor={"img"}>
                                    <h2 className={"text-center"}>Вставить изображение</h2>
                                    <i className={"text-center  mdi mdi-cloud-upload"}
                                       style={{fontSize: "50px"}}></i>
                                </label>
                                <input type="file" className={"d-none"} accept={"image/png, image/jpeg"} id={"img"}
                                       name={"img"}
                                       onChange={() => uploadNewsPhoto()}/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="more" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">поддропность</h1>
                            <button className={"bg-transparent border-0"}   data-bs-dismiss={"modal"}>
                                <i className={"text-white fa-solid fa-x"}></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <img src={Apis.getContent + img} className={"w-100"} style={{height: "30vh"}}
                                 alt={"topilmadi"}/>
                            <p className={"mt-4"}>{description}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}