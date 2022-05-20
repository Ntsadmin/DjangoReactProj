import Operations from "../axiosRequests/axiosRequests";

export default async function shiftPost() {

    const shift = new Operations();

    let currentDate = new Date();

    let shiftNum = 1 ? 8 <= currentDate.getHours() < 20 : 2

    let params = {
        "shiftnum": Number(shiftNum),
        "time_date": currentDate.toISOString()
    }

    const postShift = await shift.postShift(params)
}