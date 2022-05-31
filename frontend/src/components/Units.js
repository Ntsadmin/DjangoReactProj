import React, {Component} from "react";
import Operations from "../axiosRequests/axiosRequests";
import "../styles/Units.css";
import TechOp from "./TechOp";
import NoContent from "../Standart/NoContent";


const units = new Operations()

// Функция представления всех уникальных участков в цехах
export default class Units extends Component {
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

    async unitsData() {
        const Response = await units.getUnits()
        const responseUnitResult = Response.data

        await this.changesCheckUnits(this.state.data, responseUnitResult.data)
        this.setState(() => {
            return {
                loaded: false
            }
        })

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


    async getFullOperations() {

        const operationsResponse = await units.getFullOperations()
        const operationsResults = operationsResponse.data

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


    async componentDidMount() {
        await Promise.all([this.unitsData(), this.getFullOperations()]);
        this.timer = setInterval(async () => {
            await this.unitsData();
            await this.getFullOperations();
        }, 15000)
    }


    componentWillUnmount() {
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

                {this.state.loaded ? this.state.data.map(machine => {

                    if (machine.online_accessible) {

                        return (
                            <div key={machine.id} className={"main-content"}>

                                <TechOp machine={machine} info={this.state.operations}/>
                            </div>
                        );
                    }
                }) : <div>

                </div>
                }

            </div>
        )
    }
}