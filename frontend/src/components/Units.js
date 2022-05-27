import React, {Component} from "react";
import Operations from "../axiosRequests/axiosRequests";
import "../styles/Units.css";
import TechOp from "./TechOp";


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
                    loaded: true
                }
            })
        }
    }


    async getCheckProductivity(pk) {
        const productivityResponse = await units.getProductivity(pk);
        return productivityResponse.data
    }


    async componentDidMount() {
        await this.unitsData();
        this.timer = setInterval(async () => {
            await this.unitsData();
        }, 60000)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }


    render() {
        if (!this.state.loaded) return null
        else {
            return (
                <div className="bg_image">

                    {this.state.data.map(machine => {

                        if (machine.online_accessible) {

                            return (
                                <div key={machine.id} className={"main-content"}>

                                    <TechOp machineRef={machine.unit_ref} TechOp={machine.unit_name} info={machine}/>

                                    <div
                                        className={machine.is_productive === 2 ? 'Working' :
                                            machine.is_productive === 1 ? "semi-working" :
                                                "notWorking"}> </div>
                                </div>
                            );
                        }
                    })}

                </div>
            )
        }

    }
}