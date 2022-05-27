import axios from "axios";

// Передаём сюда общее URL нашего endpoint
const API_URL = 'http://192.100.1.108:7000/api'

// These axios defaults allows us to get the csrftoken of any django requests
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
axios.defaults.xsrfCookieName = "csrftoken";

export default class Operations {
    constructor() {
    }

    // Получаем участки
    getUnits() {
        const url = `${API_URL}/units/`
        return axios.get(url)
    }

    // Получаем все операции по всем участкам
    getFullOperations() {
        const url = `${API_URL}/operations/`
        return axios.get(url)
    }

    // Получаем данные по уникальному участку (pk)
    getOperations(pk) {
        const url = `${API_URL}/operations/${pk}/`
        return axios.get(url)
    }

    // Получаем производительность уникального участка
    getProductivity(pk) {
        const url = `${API_URL}/units/${pk}`
        return axios.get(url)
    }

    // Получаем последнюю операцию уникального участка
    getLastOperation(pk) {
        const url = `${API_URL}/lastoperation/${pk}`
        return axios.get(url)
    }

    // Получаем причины останова уникального участка (pk)
    getDownCause(pk) {
        const url = `${API_URL}/downcause/${pk}/`
        return axios.get(url)
    }

    // Добавление причины останова (пока не реализовано в проекте, но в будущем, функция будет добавлена)
    postDownCause(data){
        const take = `${API_URL}/downcause/`
        return axios({
            method:'POST',
            url:take,
            data: data,
        })
    }

    // Получаем все регистрированные смены (пробный запрос)
    getShifts() {
        const url = `${API_URL}/shift/`
        return axios.get(url)
    }

    // Добавление смены в регистре (пробный запрос)
    postShift(data) {
        const take = `${API_URL}/shift/`
        return axios({
            method: 'POST',
            url: take,
            data: data,
        })
    }

}

