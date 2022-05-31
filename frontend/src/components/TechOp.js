import React, {useEffect, useState} from "react";
import {Table} from "react-bootstrap";

import "../styles/TechOp.css";

import techResultTable from "../tableOperationTables/techResultTable";

import NoContent from "../Standart/NoContent";
import CheckLastOperation from "./checkLastOperation";

// Функция представления данные в виде таблицы, а также время простоя
function TechOp({machine, info}) {

    const params = machine.unit_ref
    const machineName = machine.unit_name

    const currentMoscowTime = new Date();
    currentMoscowTime.setHours(currentMoscowTime.getHours() + 2);

    const [availableMachine, setAvailableMachine] = useState(false);
    const [changes, setChanges] = useState(false)


    useEffect(() => {
        setAvailableMachine(true);
        techResultTable(info, machineName, params, machine.is_productive)
        if ('noChanges' in machine && !machine.noChanges) {
            // console.log("changed" + machineName)
            setChanges(true)
            setInterval(() => {
                setChanges(false)
            }, 3000)
        } else {
            setChanges(false)
        }
    }, [])

    if (availableMachine) {
        return (
            <div className={"Data"}>
                <h1>
                    {machineName}
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
                                Производительность (15 мин)
                            </th>
                        </tr>
                        </thead>
                        <tbody id={"tbody-content-results" + params}/>
                    </Table>
                </div>

                <div className={changes ? "circle" : "noCircle"}>

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