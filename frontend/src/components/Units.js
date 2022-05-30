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
        this.state = {
            data: [],
            loaded: false,
            placeholder: "loading",
            operations: [],
        }
    }

    async unitsData() {
        const Response = await units.getUnits()
        if (Response.status > 400) {
            return this.setState(() => {
                return {placeholder: "Something went wrong!"}
            })
        } else {
            return this.setState(() => {

                return {
                    data: Response.data,

                }
            })
        }
    }


    async getFullOperations() {

        const operationsResponse = await units.getFullOperations()
        const operationsResults = operationsResponse.data

        this.setState(() => {
            return {
                loaded: false
            }
        })


        if (operationsResponse.status > 400) {
            return this.setState(() => {
                return {placeholder: "Something went wrong!"}
            })
        } else {
            return this.setState(() => {
                return {
                    operations: operationsResults.data,
                    loaded: true
                }
            })
        }
    }


    async componentDidMount() {
        await Promise.all([this.unitsData(), this.getFullOperations()]);
        this.timer = setInterval(async () => {
            await this.getFullOperations();
        }, 60000)
    }


    componentWillUnmount() {
        clearInterval(this.timer)
    }


    render() {
        if (!this.state.loaded) {
            return null
        }
        return (
            <div className="bg_image">

                {this.state.loaded ? this.state.data.map(machine => {

                    if (machine.online_accessible) {

                        return (
                            <div key={machine.id} className={"main-content"}>

                                <TechOp machineReference={machine.unit_ref} TechOp={machine.unit_name}
                                        info={this.state.operations}/>
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