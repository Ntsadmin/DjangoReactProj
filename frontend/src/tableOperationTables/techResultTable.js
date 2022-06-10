import milliToHMS from "../utils/milliToHMS";

function techResultTable(ResponseData, machineName, unit_ref, productivity, changes) {

    // начальное время (точка, от которой мы отталкиваемся)
    let currentTime = new Date();
    
    if (6 <= currentTime.getHours() < 18) {
        currentTime.setHours(8)
        currentTime.setMinutes(0)
        currentTime.setSeconds(0)
    } else if (0 <= currentTime.getHours() < 6) {
        currentTime.setHours(currentTime.getHours() - 12)
        currentTime.setHours(20)
        currentTime.setMinutes(0)
        currentTime.setSeconds(0)
    } else {
        currentTime.setHours(20)
        currentTime.setMinutes(0)
        currentTime.setSeconds(0)
    }

    

    let result = []

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

                        // Сортируем весь полученный результат
                        result.push(tableData[i])

                    }
                }
            }

	    for (let i = 0; i < result.length - 1; i++) {
		    let techTime = new Date(result[i].optime)

		    // Если разница превышает 5 мин, то добавляем к простою
		    if (currentTime - techTime > 300000) {
			    difference += currentTime - techTime
		    }
		    
		    // Значение следующей точки записываем в начальной
                    currentTime = techTime

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

	    const lastElement = result[result.length -1]
	    let constDate = new Date()
	    if (6 <= constDate.getHours() < 18) {
		    constDate.setHours(8)
		    constDate.setMinutes(0)
		    constDate.setSeconds(0)
	    } else if (0 <= constDate.getHours() < 6) {
		    constDate.setHours(constDate.getHours() - 12)
		    constDate.setHours(20)
		    constDate.setMinutes(0)
		    constDate.setSeconds(0)
	    } else {
		    constDate.setHours(20)
		    constDate.setMinutes(0)
		    constDate.setSeconds(0)
	    }
	    
	    if (new Date(lastElement.optime) - constDate > 300000) {
		    difference += new Date(lastElement.optime) - constDate
	    }
	    
	    all_tubes += 1;
	
 	    if (lastElement.opresult === 1) {
		    good_tubes += 1;
	    } else {
		    bad_tubes += 1;
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
            console.log(e)
        }
    }, 250)
}

export default techResultTable;
