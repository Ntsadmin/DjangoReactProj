import React, {useState} from "react";
import DatePicker from 'react-datepicker';

import Select from 'react-select'
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/ShiftInfo.css"
import Operations from "../axiosRequests/axiosRequests";
import {Table} from "react-bootstrap";
import shiftInfoTable from "../tableOperationTables/shiftInfoTable";

const getInfoShift = new Operations();


function ShiftInfo() {

    const [startDate, setStartDate] = useState(new Date());
    const [shiftNum, setShiftNum] = useState(null);

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

            <button className="btn btn-primary" onClick={handleSubmit}>Показать данные</button>

            <Table className={"Datatable"}>
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
        </div>
    )
}

export default ShiftInfo;