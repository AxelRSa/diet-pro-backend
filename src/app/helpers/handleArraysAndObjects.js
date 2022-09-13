/** Measure object
 * @typedef {Object} Measure
 * @property  {Number | null}  idMeasure
 * @property  {String}  name
 * @property  {Number}  quantity
 * @property  {Number}  grams
 */

/** Create measure
 * @param  {Number} [quantity] quantity selected of that measure
 * @param  {String | undefined} [name] measure name
 * @param  {Number | null} [idMeasure] measure id
 * @param  {Number} [grams] grams per unit
 * @return  {Measure}
 */
const generateMeasure = (quantity = 100, name = "gr", idMeasure = null, grams = 100) => {
  return {
    quantity, name, idMeasure, grams
  }
}

/** Food object
 * @typedef {Object} Food
 * @property  {Number}  idFood
 * @property  {String}  name
 * @property  {Number}  carbohydrates
 * @property  {Number}  protein
 * @property  {Number}  fat
 * @property  {Measure[]}  [items]
 */

/** Create food
 * @param  {Number} idFood
 * @param  {String} name
 * @param  {Number} carbohydrates
 * @param  {Number} protein
 * @param  {Number} fat
 * @param  {Measure[]} [measures]
 * @return {Food}
 */
const generateFood = (idFood, name, carbohydrates, protein, fat, measures) => {
  if (!measures) { return { idFood, name, carbohydrates, protein, fat } }
  return { idFood, name, carbohydrates, protein, fat, items: measures }
}

/** Meal object
 * @typedef {Object} Meal
 * @property  {Number}  idMeal
 * @property  {String}  name
 * @property  {Food[]}  [foods]
 */

/** Create meals
 * @param {Number} idMeal
 * @param {String} name
 * @param {Food[]} [foods]
 * @return {Meal}
 */
const generateMeal = (idMeal, name, foods) => {
  return { idMeal, name, foods }
}


/** Function to generate foods arrays
 * @param   {Array} array
 * @returns {Food[]}
 */
const generateFoodStructure = (array) => {
  return array
    .map((item) => {
      // search coincidence in the ones that have "measureName" and formatted them an put it in "items" new attribute
      let newItems = null

      if (item.measureName) {
        newItems = array
          .filter(({ idFood }) => idFood === item.idFood)
          .map(({ measureName, quantity, idMeasure }) => generateMeasure(1, measureName, idMeasure, quantity))
      }

      const { idFood, name, carbohydrates, protein, fat } = item
      if (newItems === null) {
        return generateFood(idFood, name, carbohydrates, protein, fat)
      }
      return generateFood(idFood, name, carbohydrates, protein, fat, newItems)
    }, [])
    // erase repeated ones
    .reduce((acc, current) => {
      const foodNotExist = !acc.some(item => item.idFood === current.idFood)
      if (foodNotExist) acc.push(current)
      return acc
    }, [])
}

/** generateMealStructure function
 * @param {{idMeal: number,
 *  name: string,
 *  idFood: number,
 *  foodName: string,
 *  carbohydrates: number,
 *  protein:number,
 *  fat: number,
 *  quantity: number,
 *  idMeasure: number,
 *  measure_name: string,
 *  measureQuantity: number}[]} array
 * @returns {Meal[]}
 */
const generateMealStructure = (array) => {
  return array
    // give all format to response
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
