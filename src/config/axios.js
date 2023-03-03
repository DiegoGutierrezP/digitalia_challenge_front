import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_API;

const axiosCustom = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        //"Content-Type": "multipart/form-data",
        "Accept": "application/json",
    }
}) 

axiosCustom.interceptors.request.use(async config => {
    
    //config.cancelToken = ctks.getCancelToken().token;//it will update cancelToken on every call
    //console.log("config", config);
    //ctks = new CancelTokenSource();
    return config;
})

export default axiosCustom;