function techResultTable(data, machineName) {
    setTimeout(function () {

        const tableData = data;

        const date = new Date();
        const currentTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()


        let table = document.getElementById("tbody-content-results");
        let k = "";
        table.innerHTML = k;
        try {

            if (tableData !== null) {
                let all_tubes, good_tubes, bad_tubes, repair_tubes, productivity = 0
                for(let i = 0; i < tableData.length; i++){
                    if(tableData[i]['OpResult'] === 0){
                        good_tubes += 1;
                    } else if(tableData[i]['OpResult'] === 1){
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