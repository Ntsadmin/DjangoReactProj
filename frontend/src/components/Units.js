import React, {Component} from "react";
import Operations from "../axiosRequests/axiosRequests";
import "../styles/Units.css";
import TechOp from "./TechOp";
import NoContent from "../Standart/NoContent";
import {Table} from "react-bootstrap";


const units = new Operations()

// Функция представления всех уникальных участков в цехах
export default class Units extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.currentDate = new Date()
        this.responseResult = 0
        this.state = {
            data: [],
            loaded: false,
            placeholder: "loading",
            operations: [],
        }
    }

    changesCheckUnits(previousArray, currentArray) {

        if (previousArray.length === currentArray.length) {
            for (let i = 0; i < previousArray.length; i++) {
                currentArray[i]['noChanges'] = (previousArray[i].total_treated_tubes === currentArray[i].total_treated_tubes);
            }
        }
    }

    // Получаем все возможные участки
    async unitsData() {
        const Response = await units.getUnits()
        const responseUnitResult = Response.data

        // Меняем состояние участка, если были добавлены операции
        await this.changesCheckUnits(this.state.data, responseUnitResult.data)

        if (this._isMounted) {
            if (Response.status > 400) {
                return this.setState(() => {
                    return {placeholder: "Something went wrong!"}
                })
            } else {
                return this.setState(() => {

                    return {
                        data: responseUnitResult.data,
                        loaded: true

                    }
                })
            }
        }
    }


    // Получаем все возможные операции
    async getFullOperations() {

        const operationsResponse = await units.getFullOperations()
        const operationsResults = operationsResponse.data

        if (this._isMounted) {
            if (operationsResponse.status > 400) {
                return this.setState(() => {
                    return {placeholder: "Something went wrong!"}
                })
            } else {
                return this.setState(() => {
                    return {
                        operations: operationsResults.data,

                    }
                })
            }
        }
    }


    // При рендеринг вызываем начальные функции (вместе), после вызывает по очереди каждые n секунд
    async componentDidMount() {
        this._isMounted = true
	await this.getFullOperations();
	await this.unitsData();
        this.timer = setInterval(async () => {
            await this.getFullOperations();
            await this.unitsData();

        }, 15000)
    }


    componentWillUnmount() {
        this._isMounted = false;
        clearInterval(this.timer)
    }


    render() {
        if (!this.state.loaded) {
            return (
                <NoContent/>
            )
        }
        return (
            <div className="bg_image">
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
                            Производительность (шт./ч)
                        </th>
                        <th>
                            Суммарное время простоя
                        </th>
                    </tr>
                    </thead>
                    <tbody className={"Datatable"}>
                    {this.state.data.map(machine => {

                        if (machine.online_accessible) {

                            return (
                                // Передаём ключ, который меняется, чтобы дочерние элементы рендерились при изменении ключа
                                <TechOp key={machine.total_treated_tubes + machine.unit_name} machine={machine} info={this.state.operations}/>
                            );
                        }
                    })
                    }

                    < /tbody>
                </Table>
            </div>
        )
    }
}
