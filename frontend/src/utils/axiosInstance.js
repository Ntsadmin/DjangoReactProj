import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'



//const baseURL = 'https://192.100.1.108'


const windowsURL = window.location.href
let usedURL = ''


if (windowsURL.includes('192.100.1') {
	usedURL = '192.100.1.108';
} else if (windowsURL.includes('reports.nts-leader') {
	usedURL = 'reports.nts-leader.ru:2082';
} else {
	usedURL = ''
}

let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null

const axiosInstance = axios.create({
    baseURL,
    headers:{Authorization: `Bearer ${authTokens?.access}`}
});

axiosInstance.interceptors.request.use(async req => {
    if(!authTokens){
        authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
        req.headers.Authorization = `Bearer ${authTokens?.access}`
    }

    const user = jwt_decode(authTokens.access)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if(!isExpired) return req

    const response = await axios.post(`${usedURL}/VN61iml2PYcEqa/token/refresh/`, {
        refresh: authTokens.refresh
      });

    localStorage.setItem('authTokens', JSON.stringify(response.data))
    req.headers.Authorization = `Bearer ${response.data.access}`
    return req
})


export default axiosInstance;
