function stopCauseTable(data, MachineName) {
    setTimeout(function () {
        const tableData = data;
        let table = document.getElementById("tbody-content-cause");
        let k = "";
        table.innerHTML = k;

        try {
            if (tableData !== null) {
                console.log("not null")
            } else {
                k += '<tr>';
                k += '<td>' + MachineName + '</td>';
                k += '</tr>';
            }
            table.innerHTML = k;
        } catch (e) {
            console.log(e)
        }

    }, 250)
}

export default stopCauseTable;