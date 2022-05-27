import axios from "axios";

const API_URL = 'http://127.0.0.1:7000/api'

// These axios defaults allows us to get the csrftoken of any django requests
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
axios.defaults.xsrfCookieName = "csrftoken";

export default class Operations {
    constructor() {
    }


    // getting the units
    getUnits() {
        const url = `${API_URL}/units/`
        return axios.get(url)
    }

    // Getting the operations for a certain unit
    getOperations(pk) {
        const url = `${API_URL}/operations/${pk}/`
        return axios.get(url)
    }

    // Getting the downcause of a certain unit
    getDownCause(pk) {
        const url = `${API_URL}/downcause/${pk}/`
        return axios.get(url)
    }

    // Post a downcause of a certain unit
    postDownCause(data){
        const take = `${API_URL}/downcause/`
        return axios({
            method:'POST',
            url:take,
            data: data,
        })
    }

    // Getting the shifts (not used currently in the project, but a good form of request for examples)
    getShifts() {
        const url = `${API_URL}/shift/`
        return axios.get(url)
    }

    // Post a shift (also for examples)
    postShift(data) {
        const take = `${API_URL}/shift/`
        return axios({
            method: 'POST',
            url: take,
            data: data,
        })
    }

    //Getting the productivity of a machine
    getProductivity(pk) {
        const url = `${API_URL}/units/${pk}`
        return axios.get(url)
    }

    //Getting the last Operation of a machine
    getLastOperation(pk) {
        const url = `${API_URL}/lastoperation/${pk}`
        return axios.get(url)
    }

    getFullOperations() {
        const url = `${API_URL}/operations/`
        return axios.get(url)
    }
}

