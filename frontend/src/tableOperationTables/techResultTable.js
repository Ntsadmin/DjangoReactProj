import milliToHMS from "../utils/milliToHMS";

function techResultTable(ResponseData, machineName, unit_ref, productivity, changes) {

    // начальное время (точка, от которой мы отталкиваемся)
    const currentTime = new Date();
    const currentMoscowTime = currentTime.setHours(currentTime.getHours() + 2)
    let neededTime = new Date(currentMoscowTime)

    setTimeout(() => {

        const tableData = ResponseData;
        let all_tubes = 0;
        let good_tubes = 0;
        let bad_tubes = 0;
        let difference = 0;

        let table = document.getElementById("Datatable" + unit_ref);
        let k = "";
        table.innerHTML = k;
        try {
            k += '<td>' + machineName + '</td>';


            if (tableData.length) {
                for (let i = 0; i < tableData.length; i++) {

                    if (tableData[i]['unitref'] === unit_ref) {

                        // Время совершённой операции уникальным участком
                        let techTime = new Date(tableData[i].optime)

                        // Если разница превышает 5 мин, то добавляем к простою
                        if (neededTime - techTime > 300000) {
                            difference += neededTime - techTime
                        }

                        // Значение следующей точки записываем в начальной
                        neededTime = techTime

                        // Добавляем трубу к счётчику
                        all_tubes += 1;
                        if (tableData[i]['opresult'] === 1) {
                            // Годная труба
                            good_tubes += 1;
                        } else {
                            // Брак
                            bad_tubes += 1;
                        }

                    }
                }
            }

            // Конвертатор из миллисекунд в ч:м:с
            difference = milliToHMS(difference)

            // Добавляем значения в таблицу
            k += '<td>' + all_tubes + '</td>';
            k += '<td>' + good_tubes + '</td>';
            k += '<td>' + bad_tubes + '</td>';
            k += '<td>' + productivity + '</td>';
            k += '<td>' + difference + '</td>';

            let t = k

            if (changes) {
                // Если труба добавлена, то ячейка загорится зелёным на 2 сек
                k += '<td class="changed"> </td>'
                setTimeout(() => {
                    t += '<td class="notChanged"> </td>'
                    table.innerHTML = ""
                    table.innerHTML += t
                }, 2000)
            } else {
                k += '<td class="notChanged"> </td>'
            }

            table.innerHTML += k;

        } catch
            (e) {
            alert(e)
        }
    }, 250)
}

export default techResultTable;
