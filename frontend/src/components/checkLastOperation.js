import React, {useEffect, useState} from "react";
import Operations from "../axiosRequests/axiosRequests";
import milliToHMS from "../utils/milliToHMS";

const lastOperation = new Operations()

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
        this.timer = setInterval(async () => {
            await this.unitsData();
        }, 60000)

    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }


    render() {
        if (this.state.loaded) {
            return (
                <div>
                    Время застоя: {this.state.time}
                </div>
            )
        } else {
            return null
        }

    }
}