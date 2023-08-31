import axios from "axios";
import {BaseUrl} from "./BaseUrl.js";
import {Apis} from "./Apis.js";
import {isSuccess} from "./Auth/isSuccess.js";
import toast from "react-hot-toast";

export const LoginAction = async (data) => {
    try {
        const res = await axios.post(BaseUrl + Apis.auth + "/login", data)
        if (isSuccess(res.status)) {
            localStorage.setItem("access-token", res.data.token)
            localStorage.setItem("user_uuid", res.data.user.id)
            localStorage.setItem("path", "/")
            return toast.success("Добро пожаловать 👋", {duration: 4000})
        }
    } catch (err) {
        localStorage.setItem("path", '/auth/login')
        return toast.error("Номер телефона или пароль неверный")
    }
}

export const AddNews = async (data) => {
    try {
        const res = await axios.post(BaseUrl + Apis.blogs, data)
        if (isSuccess(res.status)) {
            localStorage.setItem("newsId", res.data)
        }
    } catch (err) {
        return toast.error(err.message)
    }
}

export const GetNews = async () => {
    try {
        const res = await axios.get(BaseUrl + Apis.blogs)
        if (isSuccess(res.status)) {
            return res.data
        }
    } catch (err) {
        return toast.error(err.message)
    }
}

export const UploadPhoto = async (data) => {
    try {
        const res = await axios.post(BaseUrl + Apis.upload, data)
        if (isSuccess(res.status)) {
            localStorage.setItem("photoId", res.data)
        }
    } catch (err) {
        if (err.response.status === 400) {
            return toast.error(err.response.data.message)
        }
    }
}

export const GetData = async (path) => {
    try {
        const res = await axios.get(BaseUrl + Apis.auth + "/" + localStorage.getItem("user_uuid"))
        if (isSuccess(res.status)) {
            localStorage.setItem("path", path)
            return res.data
        }
    } catch (err) {
        localStorage.setItem("path", "/unauthorized")
    }
}

export const GetAllAdmin = async () => {
    try {
        const res = await axios.get(BaseUrl + Apis.auth)
        if (isSuccess(res.status)) {
            return res.data
        }
    } catch (err) {
        return toast.error("Ошибка при загрузке администраторов.")
    }
}

export const AddAdmin = async (data) => {
    try {
        const res = await axios.post(BaseUrl + Apis.auth + '/add-admin', data)
        if (isSuccess(res.status)) {
            return toast.success(res.data.message)
        }
    } catch (err) {
        if (err.response.status === 409) {
            return toast.error("такой адрес электронной почты имеется в базе данных")
        }
    }
}

export const DeleteAdmin = async (id) => {
    try {
        const res = await axios.delete(BaseUrl + Apis.auth + "/" + id)
        if (isSuccess(res.status)) {
            return toast.success(res.data.message)
        }
    } catch (err) {
        return toast.error("Не удалось удалить администратора")
    }
}

export const DeleteNews = async (id) => {
    try {
        const res = await axios.delete(BaseUrl + Apis.blogs + "/" + id)
        if (isSuccess(res.status)) {
            setTimeout(() => {
                window.location.reload()
            }, 1000)
            return toast.success(res.data.message)
        }
    } catch (err) {
        return toast.error(err.message)
    }
}

export const GetOrders = async () => {
    try {
        const res = await axios.get(BaseUrl + Apis.order)
        if (isSuccess(res.status)) {
            return res.data
        }
    } catch (err) {
        return toast.error("в списке заказов ошибка")
    }
}

export const GetRequest = async () => {
    try {
        const res = await axios.get(BaseUrl + Apis.request)
        if (isSuccess(res.status)){
            return res.data._embedded.list
        }
    }catch (err){
        return toast.error("ошибка в списке запросов")
    }
}

export const Remove = async (id) => {
    try {
        const res = await axios.delete(BaseUrl + Apis.request + "/" + id)
        if (isSuccess(res.status)){
            setTimeout(() => {
                window.location.reload()
            }, 1000)
            return toast.success("запрос успешно удален")
        }
    }catch (err){
        return toast.error("не могу удалить запрос")
    }
}

export const Edit = async (id, data) => {
    try {
        const res = await axios.put(BaseUrl + Apis.blogs + "/" + id, data)
        if (isSuccess(res.status)){
            return toast.success(res.data.message)
        }
    }catch (err){
        return toast.error("Ошибка редактирования")
    }
}