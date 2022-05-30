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
                    
		}
            })
        }
    }


    async getFullOperations() {
        const operationsResponse = await units.getFullOperations();
        if (operationsResponse.status > 400) {
		return this.setState( () => {
			return {placeholder: "Something went wrong!"}
		})
	} else {
		return this.setState( () => {
			return {
				operations: operationsResponse.data,
				loaded: true
			}
		})
    	}
    }


    async componentDidMount() {
        await Promise.all([this.unitsData(), this.getFullOperations()]);
        this.timer = setInterval(async () => {
            await Promise.all([this.unitsData(), this.getFullOperations()]);
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

                                    <TechOp machineRef={machine.unit_ref} TechOp={machine.unit_name} info={this.state.operations}/>

                                </div>
                            );
                        }
                    })}

                </div>
            )
        }

    }
}
