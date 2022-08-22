const generateDashboardPersonStructure = (array) => {
  const newArray = [{}]

  array.forEach((element1) => {

    const newObject = {
      name: element1.name,
      idPerson: element1.id_person,
    }

    // if we have info, then open the "chartData" attribute
    if (element1.date !== null) {
      newObject.chartData = { labels: [element1.date], data: [element1.weight] }
    }

    // group by name
    newArray.forEach(element2 => {


      if (element1.id_person === element2.idPerson && element1.date !== null) {

        // if not exist "chartData" attribute, then create it
        if (!element2.chartData) {
          return element2.chartData = { labels: [element1.date], data: [element1.weight] }
        }

        element2.chartData.labels.push(element1.date)
        element2.chartData.data.push(element1.weight)
      }

    });

    // push if not exist
    if (!newArray.some(element3 => element3.idPerson === element1.id_person)) {
      newArray.push(newObject)
    }

  });

  newArray.shift()

  // order by last update be first
  newArray.sort((a, b)=>{
    if (a.chartData && b.chartData) {
      if (a.chartData.labels.at(-1) > b.chartData.labels.at(-1)) return -1
      return 1
    }
    return -1
  })

  return newArray
}

const generateFoodStructure = (array) => {
	return array
		.map((item, index, array) => {
			// search coincidence in the ones that have "measureName" and formatted them an put it in "items" new attribute
			if (item.measureName) {
				item.items = array
					.filter(item2 => item2.idFood === item.idFood)
					.map(item2 => { return { quantity: 1, measureName: item2.measureName, grams: item2.quantity, idMeasure: item2.idMeasure } })
			}
			// delete not used object attributes
			delete item.measureName
			delete item.idMeasure
			delete item.quantity
			return item
		}, [])
		// erase repeated ones
		.reduce((acc, current) => {
			const foodNotExist = !acc.some(item => item.idFood === current.idFood)
			if (foodNotExist) acc.push(current)
			return acc
		}, [])
}

module.exports = {
  generateDashboardPersonStructure,
  generateFoodStructure
}
