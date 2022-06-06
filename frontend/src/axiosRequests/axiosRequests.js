import axios from "axios";

// Передаём сюда общее URL нашего endpoint


// These axios defaults allows us to get the csrftoken of any django requests
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
axios.defaults.xsrfCookieName = "csrftoken";

export default class Operations {
    constructor() {
	    this.windowsURL = window.location.href;
	    if (this.windowsURL.includes('192.100.1.108')) {
		    this.API_URL = 'https://192.100.1.108/VN61iml2PYcEqa';
	    } else if (this.windowsURL.includes('reports.nts-leader')){
		    this.API_URL = 'https://reports.nts-leader.ru:2082/VN61iml2PYcEqa';
	    } else {
		    this.API_URL = ''
	    }
    }

    // Получаем участки
    getUnits() {
        const url = `${this.API_URL}/units/`
        return axios.get(url)
    }

    // Получаем все операции по всем участкам
    getFullOperations() {
        const url = `${this.API_URL}/operations/`
        return axios.get(url)
    }

    // Получаем данные по уникальному участку (pk)
    getOperations(pk) {
        const url = `${this.API_URL}/operations/${pk}/`
        return axios.get(url)
    }

    // Получаем производительность уникального участка
    getProductivity(pk) {
        const url = `${this.API_URL}/units/${pk}`
        return axios.get(url)
    }

    // Получаем последнюю операцию уникального участка
    getLastOperation(pk) {
        const url = `${this.API_URL}/lastoperation/${pk}`
        return axios.get(url)
    }

    // Получаем причины останова уникального участка (pk)
    getDownCause(pk) {
        const url = `${this.API_URL}/downcause/${pk}/`
        return axios.get(url)
    }

    // Добавление причины останова (пока не реализовано в проекте, но в будущем, функция будет добавлена)
    postDownCause(data){
        const take = `${this.API_URL}/downcause/`
        return axios({
            method:'POST',
            url:take,
            data: data,
        })
    }

    // Получаем все регистрированные смены (пробный запрос)
    getShifts() {
        const url = `${this.API_URL}/shift/`
        return axios.get(url)
    }

    getShiftInfo(pk) {
        const url = `${this.API_URL}/shift/${pk}`
        return axios.get(url)
    }

    // Добавление смены в регистре (пробный запрос)
    postShift(data) {
        const take = `${this.API_URL}/shift/`
        return axios({
            method: 'POST',
            url: take,
            data: data,
        })
    }

}

