import Operations from "../axiosRequests/axiosRequests";

export default async function shiftPost() {

    const shift = new Operations();

    let currentDate = new Date();

    let shiftNum = 8 <= currentDate.getHours() < 20 ? 1 : 2

    let params = {
        "shiftnum": shiftNum,
        "time_date": currentDate.toISOString()
    }

    const postShift = await shift.postShift(params)
    alert(postShift.status)
    return postShift.status
}