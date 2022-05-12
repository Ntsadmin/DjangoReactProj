import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import Operations from "../axiosRequests/axiosRequests";
import {Table} from "react-bootstrap";

import "../styles/TechOp.css";

import techResultTable from "../tableOperationTables/techResultTable";
import stopCauseTable from "../tableOperationTables/stopCauseTable";
import NoContent from "../Standart/NoContent";


const Operation = new Operations()

function TechOp(props) {

    const location = useLocation().search;
    const machineRef = new URLSearchParams(location).get('TechOp');
    const params = useParams().id;

    const [data, setData] = useState(null)
    const [cause, setCause] = useState(null)
    const [state, setState] = useState(false);
    const [availableMachine, setAvailableMachine] = useState(false);

    async function getUnitOperations(unitId) {
        const unitOperationsResponse = await Operation.getOperations(unitId);
        setData(unitOperationsResponse.data);
    }

    async function getUnitDownCause(unitId) {

        const unitDownCauseResponse = await Operation.getDownCause(unitId);
        setCause(unitDownCauseResponse.data);
    }


    async function getOperations() {
        if (props.unitsList.includes(machineRef)) {
            setAvailableMachine(true)
            await Promise.all([
                getUnitOperations(params), getUnitDownCause(params)
            ]).then(() => {
                setState(true);
                stopCauseTable(cause, machineRef);
                techResultTable(data, machineRef);
            })
        }
    }


    useEffect(() => {
        getOperations();
    }, [])

    if (!availableMachine || !state) {
        return (<div>
            <NoContent/>
        </div>)
    }

    return (
        <div className={"Data"}>
            <h1>
                {machineRef}
            </h1>
            <div>
                <Table className={"Datatable"}>
                    <thead>
                    <tr>
                        <th>
                            Название установки
                        </th>
                        <th>
                            Общее количество труб
                        </th>
                        <th>
                            Количество годных труб
                        </th>
                        <th>
                            Количество брака
                        </th>
                        <th>
                            Количество ремонтных
                        </th>
                        <th>
                            Производительность (труб/10 мин)
                        </th>
                    </tr>
                    </thead>
                    <tbody id={"tbody-content-results"}/>
                </Table>
            </div>

            <div>
                <table className={"Datatable"}>
                    <thead>
                    <tr>
                        <th>
                            Название установки
                        </th>
                        <th>
                            Идентификатор работника
                        </th>
                        <th>
                            Причина сбоя
                        </th>
                        <th>
                            Начала время остановки
                        </th>
                        <th>
                            Время продолжения работы участка
                        </th>
                    </tr>
                    </thead>
                    <tbody id={"tbody-content-cause"}/>
                </table>
                <button className={"myButton"}><a href={`/cause/?techId=${params}`}>Создать
                    простой</a></button>
            </div>


        </div>
    )
}

export default TechOp;