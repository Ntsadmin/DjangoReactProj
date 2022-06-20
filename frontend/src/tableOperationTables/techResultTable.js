import milliToHMS from "../utils/milliToHMS";

function techResultTable(ResponseData, machineName, unit_ref, productivity, changes) {

    // начальное время (точка, от которой мы отталкиваемся)
    let factoryTime = factoryTimezone()

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

	    for (let i = 1; i < result.length; i++) {
		    let techTime = new Date(result[i].optime)

		    factoryTime = new Date(result[i-1].optime)

		    // Если разница превышает 5 мин, то добавляем к простою
		    if (techTime - factoryTime > 300000) {
			    difference += techTime - factoryTime
		    }

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
	    
	    const firstFactoryTime = factoryTimezone()
	
	    const firstElement = result[0]
	    const firstElementTime = new Date(firstElement.optime)

	    if (firstElementTime - firstFactoryTime > 300000) {
		    difference += firstElementTime - firstFactoryTime
	    }

	    all_tubes += 1;

	    if (firstElement.opresult === 1) {
		    good_tubes += 1;
	    } else {
		    bad_tubes += 1;
	    }

	    const currentTime = new Date()
	    const currentFactoryTime = new Date(currentTime.toLocaleString('en-US', {timezone: 'Indian/Maldives'}))

	    const lastElement = result[result.length - 1]
	    const lastElementTime = new Date(lastElement.optime)

	    if (currentFactoryTime - lastElementTime > 300000) {
		    difference += currentFactoryTime - lastElementTime
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


function factoryTimezone () {

	const currentTime = new Date()

	let factoryTime = new Date(currentTime.toLocaleString('en-US', {timezone: 'Indian/Maldives'}))

	if ( 8 <= factoryTime.getHours() < 20) {
		factoryTime.setHours(8)
		factoryTime.setMinutes(0)
		factoryTime.setSeconds(0)
	} else if (0 <= factoryTime.getHours() < 8) {
		factoryTime.setHours(factoryTime.getHouts() - 12)
		factoryTime.setHours(20)
		factoryTime.setMinutes(0)
		factoryTime.setSeconds(0)
	} else {
		factoryTime.setHours(20)
		factoryTime.setMinutes(0)
		factoryTime.setSeconds(0)
	}

	return factoryTime
}

