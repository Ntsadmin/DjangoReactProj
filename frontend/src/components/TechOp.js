import React, {useEffect, useState} from "react";

import "../styles/TechOp.css";

import techResultTable from "../tableOperationTables/techResultTable";


// Функция представления данные в виде таблицы, а также время простоя
function TechOp({info, machine}) {

    const params = machine.unit_ref
    const machineName = machine.unit_name

    const [availableMachine, setAvailableMachine] = useState(false);
    const [changes, setChanges] = useState(false)

    function getTableResult(mounted) {
        try {
            if (mounted) {
                setAvailableMachine(true)
                if ('noChanges' in machine && !machine.noChanges) {
                    setChanges(true)
                } else {
                    setChanges(false)
                }
            }
            techResultTable(info, machineName, params, machine.is_productive, changes)

        } catch (e) {
            alert(e)
        }
    }


    useEffect(() => {
        let isMounted = true
        console.log("render")


        getTableResult(isMounted)

        return () => {
            isMounted = false
        }
    }, [changes])

    if (availableMachine) {
        return (
            <tr id={"Datatable" + params}>

            </tr>

        )
    } else {
        return null
    }


}

export default TechOp;