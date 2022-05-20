import React, {Component} from "react";
import Operations from "../axiosRequests/axiosRequests";
import "../styles/Units.css";
import {Link} from "react-router-dom";


const units = new Operations()

export default class Units extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "loading"
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


    componentDidMount() {
        this.unitsData();
    }

    render() {

        return (
            <div className="bg_image">

                {this.state.data.map(machine => {
                    if (machine.online_accessible) {
                        return (
                            <div key={machine.id} className={"main-content"}><Link
                                to={`/techOp/${machine.unit_ref}?TechOp=${machine.unit_name}`}>
                                {machine.unit_name}
                            </Link></div>
                        );
                    }
                })}

            </div>
        )
    }
}