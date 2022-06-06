import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'



const windowsURL = window.location.href
let usedURL = ''


if (windowsURL.includes('192.100.1') {
	usedURL = '192.100.1.108';
} else if (windowsURL.includes('reports.nts-leader') {
	usedURL = 'reports.nts-leader.ru:2082';
} else {
	usedURL = ''
}

const useAxios = () => {
    const {authTokens, setUser, setAuthTokens} = useContext(AuthContext)

    const axiosInstance = axios.create({
        baseURL,
        headers:{Authorization: `Bearer ${authTokens?.access}`}
    });


    axiosInstance.interceptors.request.use(async req => {

        const user = jwt_decode(authTokens.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if(!isExpired) return req

        const response = await axios.post(`${usedURL}/VN61iml2PYcEqa/token/refresh/`, {
            refresh: authTokens.refresh
          });

        localStorage.setItem('authTokens', JSON.stringify(response.data))

        setAuthTokens(response.data)
        setUser(jwt_decode(response.data.access))

        req.headers.Authorization = `Bearer ${response.data.access}`
        return req
    })

    return axiosInstance
}

export default useAxios;
