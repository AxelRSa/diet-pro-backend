const paginationStart = (pagination, itemsToShow) => {
  return parseInt(pagination - 1) * parseInt(itemsToShow)
}

const paginationEnd = (pagination, itemsToShow) => {
  return parseInt(pagination - 1) * parseInt(itemsToShow) + parseInt(itemsToShow) - 1
}

const howManyPagesAre = (totalResults, itemsToShow) =>{
  return Math.floor(totalResults / itemsToShow + 1)
}

module.exports = {
  paginationStart,
  paginationEnd,
  howManyPagesAre
}
