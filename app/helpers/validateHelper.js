const { validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw()
    return next()
  } catch (error) {
    res.status(403)
    const arrayErrors = error.array().map(singleError => `${singleError.msg} '${singleError.value}' in ${singleError.param}`)
    let message = ""
    arrayErrors.forEach((errorMessage, index) => {
      message += `${index +1}: ${errorMessage}. `
    });
    res.json({ status:"error", message })
  }
}

module.exports = { validateResult }
