import React, {useState} from "react";
import {useLocation} from "react-router-dom";
import Operations from "../axiosRequests/axiosRequests";

import "../styles/DownCause.css";

const Cause = new Operations()

// Функция, которая передаёт информацию для добавления причины простоя уникального участка (на будущее)
function DownCause() {

    const [workerId, setWorkerId] = useState("");
    const [stopCause, setStopCause] = useState("");
    const [stoppageTime, setStoppageTime] = useState("");
    const [resumeTime, setResumeTime] = useState("");


    const message = document.getElementById('text-errors');
    const dateTimeMessage = document.getElementById('date-errors');

    const converthms = (arr) => {
        let result = 0;
        if (!arr.length) {
            console.log("no date")
            return
        }
        result += arr[0] * 3600;
        result += arr[1] * 60;
        return result
    }


    const setWorkerIdState = (event) => {
        setWorkerId(event.target.value)
    }

    const setStopCauseState = (event) => {
        setStopCause(event.target.value)
    }

    const setStoppageTimeState = (event) => {
        setStoppageTime(event.target.value)
    }


    const setResumeTimeState = (event) => {
        setResumeTime(event.target.value)
    }


    const handleSubmit = (e) => {

        message.innerText = '';
        dateTimeMessage.innerText = '';
        e.preventDefault()

        const resumeTimeTime = resumeTime.split("T");
        const stoppageTimeTime = stoppageTime.split("T");

        const resumeHms = resumeTimeTime[1].split(":")
        const stopHms = stoppageTimeTime[1].split(":")

        const resultResume = converthms(resumeHms);
        const resultStoppage = converthms(stopHms);

        if (!stopCause.length) {

            message.innerText = "Вы забыли добавить причину останова";
            setWorkerId("");
            setStopCause("");
            setStoppageTime("");
            setResumeTime("");
            return
        }

        if (resultResume < resultStoppage) {
            dateTimeMessage.innerText = "Время начало останова не может быть больше или равна время окончания работ";
            setWorkerId("");
            setStopCause("");
            setStoppageTime("");
            setResumeTime("");
            return
        }

        let params =
            {
                'worker': workerId,
                "unit": Number(query.get("techId")),
                "stop_cause": stopCause,
                "time_of_stoppage": stoppageTime,
                "time_of_resume": resumeTime,
            };

        setWorkerId("");
        setStopCause("");
        setStoppageTime("");
        setResumeTime("");
        console.log(params);
    }


    const location = useLocation();
    const search = location.search;
    const query = new URLSearchParams(search);

    return (
        <div className={"cause-form"}>
            <form>
                <div>
                    <label>Идентификатор работника</label>
                    <input className={"numInput"} type={"number"} onChange={setWorkerIdState} value={workerId}/>
                </div>

                <div>
                    <label>Причина простоя</label>
                    <input className={"textInput"} type={"text"} onChange={setStopCauseState} value={stopCause}
                           placeholder={"Опишите причину останова ..."}/>
                </div>

                <div>
                    <label>Время останова</label>
                    <input className={"dateInput"} type={"datetime-local"} onChange={setStoppageTimeState}
                           value={stoppageTime}/>
                </div>

                <div>
                    <label>Время продолжения работы участка</label>
                    <input className={"dateInput"} type="datetime-local" onChange={setResumeTimeState}
                           value={resumeTime}/>
                </div>

                <div className={"errors"} id={"text-errors"}>

                </div>

                <div className={"errors"} id={"date-errors"}>

                </div>

                <button className={"submit-button"} onClick={handleSubmit}>Отправить</button>
            </form>

        </div>

    )
}

export default DownCause;