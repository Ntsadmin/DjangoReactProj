function shiftInfoTable(selectedDate, selectedShift, receivedData) {
    setTimeout(() => {

        let table = document.getElementById("tbody-content");
        let k = "";
        table.innerHTML = k;

	
        const percentage = Math.round((1 - (receivedData.exit_tubes/receivedData.enter_tubes)) * 1000) / 10

        const percentage2 = Math.round((1 - (receivedData.exit_line2/receivedData.enter_line2)) * 1000) / 10

        k += "<tr>";
        k += "<td>" + selectedDate + "</td>";
        k += "<td>" + selectedShift + "</td>";
        k += "<td>" + receivedData.enter_tubes + "</td>";
        k += "<td>" + percentage + "</td>";
        k += "<td>" + receivedData.exit_tubes + "</td>";
	k += "<td>" + 1 + "</td>";
        k += "</tr>";

        k += "<tr>";
        k += "<td>" + selectedDate + "</td>";
        k += "<td>" + selectedShift + "</td>";
        k += "<td>" + receivedData.enter_line2 + "</td>";
        k += "<td>" + percentage2 + "</td>";
        k += "<td>" + receivedData.exit_line2 + "</td>";
	k += "<td>" + 2 + "</td>";
        k += "</tr>";

        table.innerHTML += k;

    }, 250)
}

export default shiftInfoTable;

