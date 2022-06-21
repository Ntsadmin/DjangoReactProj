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

	   	// Если у нас имеются данные по участку 
		if (result.length) {

			// Смотрим какой был простой у первой операции с начала работы смены
			const firstElement = result[0]

			let firstOperationTime = new Date(firstElement.optime)

			// Если разница входит в ранее определяющий простой 
			if (firstOperationTime - factoryTime > 300000) {
				difference += firstOperationTime - factoryTime 
			}

			// Добавляем результат в таблицу 
			all_tubes += 1;

			if (firstElement.opresult === 1) {
				good_tubes += 1;
			} else {
				bad_tubes += 1;
			}

			// Проверяем имеются ли больше чем один записанный результат 
			if (result.length > 1) {
				for (let i = 1; i < result.length; i++) {
					// Записываем времени текущей операции и предыдущей для сравнения 
					let currentTechTime = new Date(result[i].optime)

					let prevTechTime = new Date(result[i - 1].optime)

					// Если простой больше 5 мин 
					if (currentTechTime - prevTechTime > 300000) {
						difference += currentTechTime - prevTechTime 
					}

					// Добавляем результат в таблицу
					all_tubes += 1;

					if (result[i].opresult === 1) {
						good_tubes += 1
					} else {
						bad_tubes += 1
					}
				}
			}

			// Теперь смотрим какой простой между последней операции и текущем временем 
			const currentUTCTime = new Date()
			const currentFactoryTime = currentUTCTime.setHours(currentUTCTime.getHours() + 2)
			// console.log(currentFactoryTime)
			
			// Берём последний элемент операции 
			const lastOperation = result[result.length - 1]
			const lastOperationTime = new Date(lastOperation.optime)
			// console.log(lastOperationTime)

			if (currentFactoryTime - lastOperationTime > 300000) {
				// console.log(milliToHMS(currentFactoryTime - lastOperationTime))
				difference += currentFactoryTime - lastOperationTime
			}
		} else {
			// Если у нас не было зарегитрировано ни единой операции, то просто считаем простой 
			const currentUTCTime = new Date()
			const currentFactoryTime = currentUTCTime.setHours(currentUTCTime.getHours() + 2)
			difference += currentFactoryTime - factoryTime
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

