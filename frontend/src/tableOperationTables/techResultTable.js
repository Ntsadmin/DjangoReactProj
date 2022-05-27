function techResultTable(ResponseData, machineName, unit_ref) {
    // console.log(data);
    setTimeout(() => {
            const tableData = ResponseData;


            let all_tubes = ResponseData.treated_pipes;
            let good_tubes = ResponseData.treated_good_pipes;
            let bad_tubes = ResponseData.treated_bad_pipes;

            let table = document.getElementById("tbody-content-results" + unit_ref);
            let k = "";
            table.innerHTML = k;
            try {

                k += '<tr>';
                k += '<td>' + machineName + '</td>';
                k += '<td>' + all_tubes + '</td>';
                k += '<td>' + good_tubes + '</td>';
                k += '<td>' + bad_tubes + '</td>';
                k += '</tr>';

                table.innerHTML += k;

            } catch
                (e) {
                alert(e)
            }
        } , 500)
}

export default techResultTable;