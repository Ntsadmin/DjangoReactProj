import React from "react";
import Operations from "../axiosRequests/axiosRequests";
import milliToHMS from "../utils/milliToHMS";

const lastOperation = new Operations()

// Функция для расчёта/показа простоя каждого участка
export default class CheckLastOperation extends React.Component {
    constructor(props) {
        super(props);
        this.currentTime = new Date();
        this.currentMoscowTime = this.currentTime.setHours(this.currentTime.getHours() + 2)
        this.state = {
            data: [],
            loaded: false,
            time: this.currentMoscowTime
        }
    }

    async unitsData() {
        this.currentTime = new Date();
        this.currentMoscowTime = this.currentTime.setHours(this.currentTime.getHours() + 2)
        const Response = await lastOperation.getLastOperation(this.props.unitRef)
        if (Response.status > 400) {
            return this.setState(() => {
                return {placeholder: "Something went wrong!"}
            })
        } else {
            return this.setState(() => {

                return {
                    data: Response.data,
                    loaded: true,
                    time: milliToHMS(this.currentMoscowTime - new Date(Response.data.data.optime))
                }
            })
        }
    }

    async componentDidMount() {
        await this.unitsData();
    }



    render() {
        if (this.state.loaded) {
            return (
                <div>
                    {this.state.time}
                </div>
            )
        } else {
            return null
        }

    }
}