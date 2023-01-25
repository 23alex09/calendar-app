import axios from "axios";
import { getEnvVariables } from "../helpers";

const { VITE_API_URL } = getEnvVariables();



const calendarApi = axios.create( {
    baseURL: VITE_API_URL
} )


//Los interceptores se ejecutan antes de la peticion, son para añadir por ejemplo los headers
calendarApi.interceptors.request.use( config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem( 'token' )
    }

    return config;
} )


export default calendarApi;