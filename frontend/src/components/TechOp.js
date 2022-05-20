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

    const [availableMachine, setAvailableMachine] = useState(false);

    async function getUnitOperations(unitId) {
        return await Operation.getOperations(unitId)
    }

    async function getUnitDownCause(unitId) {
        return await Operation.getDownCause(unitId)
    }


    async function getOperations() {
        if (props.unitsList[machineRef] == params) {
            setAvailableMachine(true)
            return await Promise.all([
                getUnitOperations(params), getUnitDownCause(params)
            ])
        }
    }


    useEffect(() => {
        getOperations().then((ResponseResults) => {
            techResultTable(ResponseResults[0].data, machineRef);
            stopCauseTable(ResponseResults[1].data, machineRef);
        });

    }, [])

    if (!availableMachine) {
        return (<div>
            <NoContent/>
        </div>)
    } else {
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


}

export default TechOp;