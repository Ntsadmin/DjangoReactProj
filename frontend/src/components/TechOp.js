import React, {useEffect, useState} from "react";
import Operations from "../axiosRequests/axiosRequests";
import {Table} from "react-bootstrap";

import "../styles/TechOp.css";

import techResultTable from "../tableOperationTables/techResultTable";


import NoContent from "../Standart/NoContent";
import CheckLastOperation from "./checkLastOperation";


const Operation = new Operations()

function TechOp(props) {

    const params = props.machineRef
    const machineRef = props.TechOp

    const currentMoscowTime = new Date();
    currentMoscowTime.setHours(currentMoscowTime.getHours() + 2);

    const [availableMachine, setAvailableMachine] = useState(false);


    async function getOperations() {
        if (props.unitsList[machineRef] == params) {
            setAvailableMachine(true)
            const responseData = await Operation.getOperations(params)
            const resultTableData = responseData.data.data
            techResultTable(resultTableData, machineRef, params)

        }
    }


    useEffect( () => {
        getOperations();

        const timer = setInterval(async () => {
            await getOperations()
        }, 6000);
        return () => clearInterval(timer);

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