function techResultTable(ResponseData, machineName) {
    setTimeout(function () {
        // console.log(data);
        const tableData = ResponseData.data;

        let all_tubes = 0;
        let good_tubes = 0;
        let bad_tubes = 0;
        let repair_tubes = 0;
        let productivity = 0

        const date = new Date();
        const currentTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()


        let table = document.getElementById("tbody-content-results");
        let k = "";
        table.innerHTML = k;
        try {

            if (tableData.length) {
                for(let i = 0; i < tableData.length; i++){
                    // console.log(tableData[i]);
                    if(tableData[i]['opresult'] === 1){
                        good_tubes += 1;
                    } else if(tableData[i]['opresult'] === 2){
                        bad_tubes += 1;
                    } else{
                        repair_tubes +=1;
                    }
                    all_tubes += 1;
                }

                k += '<tr>';
                k += '<td>' + machineName + '</td>';
                k += '<td>' + all_tubes + '</td>';
                k += '<td>' + good_tubes + '</td>';
                k += '<td>' + bad_tubes + '</td>';
                k += '<td>' + repair_tubes + '</td>';
                k += '<td>' + 0 + '</td>';
                k += '</tr>';

            } else {
                k += '<tr>';
                k += '<td>' + machineName + '</td>';
                k += '<td>' + 0 + '</td>';
                k += '<td>' + 0 + '</td>';
                k += '<td>' + 0 + '</td>';
                k += '<td>' + 0 + '</td>';
                k += '<td>' + 0 + '</td>';
                k += '</tr>';
            }
            table.innerHTML += k;

        } catch (e) {
            console.log(e)
        }
    }, 250)
}

export default techResultTable;