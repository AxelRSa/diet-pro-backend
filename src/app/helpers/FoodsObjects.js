/**
 * Food
 * @typedef  {Object} Food
 * @property  {Number} id
 * @property  {String} name
 * @property  {{protein: Number, carbohydrates: Number, fat:Number}} nutritionalInformation
 * @property  {FoodMeasure[]} foodMeasures
 *
 * Food Measures
 * @typedef {Object} FoodMeasure
 * @property {Number} id
 * @property {String} name
 * @property {Number} grams
 *
 * Food From DataBase
 * @typedef  {Object} FoodFromDataBase
 * @property  {Number} id_food
 * @property  {String} name
 * @property  {Number} carbohydrates
 * @property  {Number} protein
 * @property  {Number} fat
 * @property  {String} measure_name
 * @property  {Number} grams
 * @property  {Number} id_food_measure
 *
 */

/** Build foods function
 * @param {{
 * id_food: Number,
 * name: String,
 * carbohydrates:Number,
 * protein: Number,
 * fat: Number,
 * foodMeasures: Array
 * }} foodFromDataBase food object without the measure data
 * @returns {Food}
 */
module.exports.foodObject = (foodFromDataBase) => {
  const { id_food, name, carbohydrates, protein, fat, foodMeasures } = foodFromDataBase

  return {
    id: id_food,
    name,
    nutritionalInformation:{
      carbohydrates,
      protein,
      fat
    },
    foodMeasures
  }
}

/** Build foodMeasures function
 * @param {{
 * id_food_measure: Number,
 * name: String,
 * grams:Number
 * }} foodMeasureFromDataBase Measure data without food data
 * @returns {FoodMeasure}
 */
module.exports.foodMeasureObject = (foodMeasureFromDataBase) => {
  const {id_food_measure, name, grams} = foodMeasureFromDataBase
  return {
    id: id_food_measure,
    name,
    grams
  }
}


