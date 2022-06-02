function shiftInfoTable(selectedDate, selectedShift, receivedData) {
    setTimeout(() => {

        let table = document.getElementById("tbody-content");
        let k = "";
        table.innerHTML = k;

        const percentage = Math.round((1 - (receivedData.exit_tubes/receivedData.enter_tubes)) * 1000) / 10


        k += "<tr>";
        k += "<td>" + selectedDate + "</td>"
        k += "<td>" + selectedShift + "</td>"
        k += "<td>" + receivedData.enter_tubes + "</td>"
        k += "<td>" + percentage + "</td>"
        k += "<td>" + receivedData.exit_tubes + "</td>"
        k += "</tr>";

        table.innerHTML += k;

    }, 250)
}

export default shiftInfoTable;

