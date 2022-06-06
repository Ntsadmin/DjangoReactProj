import React, {useState} from "react";
import DatePicker from 'react-datepicker';

import Select from 'react-select'
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/ShiftInfo.css"
import Operations from "../axiosRequests/axiosRequests";
import {Table} from "react-bootstrap";
import shiftInfoTable from "../tableOperationTables/shiftInfoTable";
import CSVDownload from "react-csv/src/components/Download";
import {ExportCSV} from "./ExportCSV";




const getInfoShift = new Operations();


function ShiftInfo() {

    const [startDate, setStartDate] = useState(new Date());
    const [shiftNum, setShiftNum] = useState(null);

    let cvsData = [
        ["Дата", "Смена", "Вход", "% брака", "Выход"]
    ]

    const options = [
        {value: 1, label: 'Первая смена'},
        {value: 2, label: 'Вторая смена'},
    ]

    const getShiftRequestResult = async (URLSent, selectedDate, selectedShift) => {
        const response = await getInfoShift.getShiftInfo(URLSent)
        if (response.status > 400) {
            return null
        } else {
            const shiftResult = response.data.data
            const badTubes = Math.round((1 - (shiftResult.exit_tubes/shiftResult.enter_tubes)) * 1000) / 10
            const AddedValues = [selectedDate, selectedShift, shiftResult.enter_tubes, badTubes, shiftResult.exit_tubes]

            cvsData.push(AddedValues)

            await shiftInfoTable(selectedDate, selectedShift, shiftResult)
        }
    }

    const handleSubmit = async () => {

        const getSelectedDay = ("0" + startDate.getDate()).slice(-2)
        const getSelectedMonth = ("0" + (startDate.getMonth() + 1)).slice(-2)
        const getSelectedYear = startDate.getFullYear()
        const getSelectedDate = `${getSelectedYear}-${getSelectedMonth}-${getSelectedDay}`
        const sentURL = `${shiftNum}_${getSelectedDate}`

        await getShiftRequestResult(sentURL, getSelectedDate, shiftNum)
    }


    return (
        <div className={"shiftInfo"}>
            <label className={'labels'}>Выберите дату</label>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
            />

            <label className={'labels'}>Выберите смену</label>
            <Select options={options}
                    onChange={(numShift) => setShiftNum(numShift.value)}
            />

            <button className="btn35 btn60" onClick={handleSubmit}>Показать данные</button>

            <Table className={"shiftInfoTable"}>
                <thead>
                <tr>
                    <th>
                        Дата
                    </th>
                    <th>
                        Смена
                    </th>
                    <th>
                        Вход
                    </th>
                    <th>
                        % брака
                    </th>
                    <th>
                        Годная
                    </th>
                </tr>
                </thead>
                <tbody className={"Datatable"} id={"tbody-content"}/>

            </Table>
            
            <ExportCSV csvData={cvsData} fileName={`Данные за ${startDate}`} />

        </div>
    )
}

export default ShiftInfo;