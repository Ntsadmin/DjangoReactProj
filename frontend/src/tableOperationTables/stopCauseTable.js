function stopCauseTable(ResponseData, MachineName) {
    setTimeout(function () {
        // console.log(ResponseData)
        const tableData = ResponseData.data;
        let table = document.getElementById("tbody-content-cause");
        let k = "";
        table.innerHTML = k;

        try {
            if (tableData.length) {
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