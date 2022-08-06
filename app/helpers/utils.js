const generateDashboardPersonStructure = (array) => {
  const newArray = [{}]

  array.forEach((element1) => {

    const newObject = {
      name: element1.name,
      idPerson: element1.id_person,
    }

    // if we have info, then open the "chartData" atribute
    if (element1.date !== null) {
      newObject.chartData = { labels: [element1.date], data: [element1.weight] }
    }

    // group by name
    newArray.forEach(element2 => {


      if (element1.id_person === element2.idPerson && element1.date !== null) {

        // if not exist "chartData" atribute, then create it
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

  return newArray
}

module.exports = {
  generateDashboardPersonStructure
}
