/** measure object
 * @typedef {Object} Measure
 * @property  {Number | null}  id
 * @property  {String}  name
 * @property  {Number}  quantity
 * @property  {Number}  grams
 */

/** create measure
 * @param  {Number | null} [id] measure id
 * @param  {String | undefined} [name] measure name
 * @param  {Number} [quantity] quantity selected of that measure
 * @param  {Number} [grams] grams per unit
 * @return  {Measure}
 */
const generateMeasure = (id = null, name = "gr", quantity = 100, grams = 100) => {
  return { id, name, quantity, grams }
}

/** food object
 * @typedef {Object} Food
 * @property  {Number}  id
 * @property  {String}  name
 * @property  {{protein: Number, fat: Number, carbohydrates: Number}}  nutritionalInformation
 * @property  {Measure[]}  [measures]
 */

/** create food
 * @param  {Number} id
 * @param  {String} name
 * @param  {Number} carbohydrates
 * @param  {Number} protein
 * @param  {Number} fat
 * @param  {Measure[]} [measures]
 * @return {Food}
 */
const generateFood = (id, name, carbohydrates, protein, fat, measures) => {
  if (!measures) { return { id, name, nutritionalInformation: { carbohydrates, protein, fat } } }
  return { id, name, nutritionalInformation: { carbohydrates, protein, fat }, measures }
}

/** create food array from
 * @param   {Array} array
 * @returns {Food[]}
 */
const generateFoodStructure = (array) => {
  return array
    .map((row) => {
      if (!row.idMeasure) {
        const { idFood, name, carbohydrates, protein, fat } = row
        return generateFood(idFood, name, carbohydrates, protein, fat, [generateMeasure()])
      }

      const newItems = array
        .filter(({ idFood }) => idFood === row.idFood)
        .map(({ measureName, quantity, idMeasure }) => generateMeasure(idMeasure, measureName, 1, quantity))

      const { idFood, name, carbohydrates, protein, fat } = row
      return generateFood(idFood, name, carbohydrates, protein, fat, [generateMeasure(), ...newItems])
    })
    // erase repeated ones
    .reduce((acc, current) => {
      const foodNotExist = !acc.some(item => item.id === current.id)
      if (foodNotExist) acc.push(current)
      return acc
    }, [])
}

/** meal object
 * @typedef {Object} Meal
 * @property  {Number}  id
 * @property  {String}  name
 * @property  {String}  measure
 * @property  {Food[]}  [foods]
 */

/** create meals
 * @param {Number} id
 * @param {String} name
 * @param {String} measure
 * @param {Food[]} [foods]
 * @return {Meal}
 */
const generateMeal = (id, name, measure, foods) => {
  return { id, name, measure, foods }
}

/** generateMealStructure function
 * @param {Array} array
 * @returns {Meal[]}
 */
const generateMealStructure = (array) => {
  return array
    .map(register => {
      const { name, idMeal } = register

      if (register.idFood === null) {
        return generateMeal(idMeal, name)
      }

      // make foods array with all the coincidence
      const foods = array
        .filter(registerFilter => registerFilter.idMeal === register.idMeal)
        .map((registerMap) => {
          const { measureQuantity, idMeasure, measure_name, quantity, idFood, carbohydrates, protein, fat } = registerMap

          if (idMeasure !== null) {
            const measure = generateMeasure(quantity, measure_name, idMeasure, measureQuantity)

            return generateFood(idFood, name, carbohydrates, protein, fat, [measure])
          }

          return generateFood(idFood, name, carbohydrates, protein, fat, [generateMeasure()])
        })

      return generateMeal(idMeal, name, foods)
    })
    // get uniques idMeal
    .reduce((acc, current) => {
      if (!acc.some(meal => meal.idMeal === current.idMeal)) {
        acc.push(current)
      }
      return acc
    }, [])
}

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
  newArray.sort((a, b) => {
    if (a.chartData && b.chartData) {
      if (a.chartData.labels.at(-1) > b.chartData.labels.at(-1)) return -1
      return 1
    }
    return -1
  })

  return newArray
}

module.exports = {
  generateMeasure,
  generateFood,
  generateMeal,
  generateDashboardPersonStructure,
  generateFoodStructure,
  generateMealStructure
}
