import React, {useEffect, useState} from "react";
import {Table} from "react-bootstrap";

import "../styles/TechOp.css";

import techResultTable from "../tableOperationTables/techResultTable";

import NoContent from "../Standart/NoContent";
import CheckLastOperation from "./checkLastOperation";

// Функция представления данные в виде таблицы, а также время простоя
function TechOp(props) {

    const params = props.machineRef
    const machineRef = props.TechOp

    const currentMoscowTime = new Date();
    currentMoscowTime.setHours(currentMoscowTime.getHours() + 2);

    const [availableMachine, setAvailableMachine] = useState(false);



    useEffect( () => {
        setAvailableMachine(true);
        techResultTable(props.info, machineRef, params)

        // const timer = setInterval(async () => {
        //     await getOperations()
        // }, 60000);
        // return () => clearInterval(timer);

    }, [])

    if (availableMachine) {
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
                        </tr>
                        </thead>
                        <tbody id={"tbody-content-results" + params}/>
                    </Table>
                </div>

                <div className={"clock-box"}>
                    <CheckLastOperation unitRef={params}/>
                </div>

            </div>
        )
    } else {
        return (
            <div>
                <NoContent/>
            </div>
        )
    }


}

export default TechOp;