function techResultTable(ResponseData, machineName, unit_ref) {

    setTimeout(() => {

        const tableData = ResponseData;
        let all_tubes = 0;
        let good_tubes = 0;
        let bad_tubes = 0;

        let table = document.getElementById("tbody-content-results" + unit_ref);
        let k = "";
        table.innerHTML = k;
        try {
            k += '<tr>';
            k += '<td>' + machineName + '</td>';


            if (tableData.length) {
                for (let i = 0; i < tableData.length; i++) {

                    if (tableData[i]['unitref'] === unit_ref) {
                        all_tubes += 1;
                        if (tableData[i]['opresult'] === 1) {
                            good_tubes += 1;
                        } else {
                            bad_tubes += 1;
                        }

                    }
                }
            }

            k += '<td>' + all_tubes + '</td>';
            k += '<td>' + good_tubes + '</td>';
            k += '<td>' + bad_tubes + '</td>';
            k += '</tr>';
            k += '</tr>';
            table.innerHTML += k;

        } catch
            (e) {
            alert(e)
        }
    }, 500)
}

export default techResultTable;