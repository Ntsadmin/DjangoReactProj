function shiftInfoTable(selectedDate, selectedShift, receivedData) {
    setTimeout(() => {

        let table = document.getElementById("tbody-content");
        let k = "";
        table.innerHTML = k;

        const percentage = Math.round((1 - (receivedData[2]/receivedData[0])) * 1000) / 10


        k += "<tr>";
        k += "<td>" + selectedDate + "</td>"
        k += "<td>" + selectedShift + "</td>"
        k += "<td>" + receivedData[0] + "</td>"
        k += "<td>" + percentage + "</td>"
        k += "<td>" + receivedData[2] + "</td>"
        k += "</tr>";

        table.innerHTML += k;

    }, 250)
}

export default shiftInfoTable;

