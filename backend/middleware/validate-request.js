//* validation middleware
function validateRequest(req, res, next, schema) {
  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };
  const { error, value } = schema.validate(req.body, options);

  if (error) {
    const errorDetails = error.details.map((x) => ({
      path: x.path.join("."),
      message: x.message,
    }));

    // Create an error message that combines field names with their corresponding error messages
    const combinedErrorMessages = errorDetails
      .map((x) => `${x.path}, ${x.message}`)
      .join(", ");

    console.log(error.details, error);

    return res.status(400).json({
      Status: "Fail",
      Code: 0,
      Message: `Validation error in fields: ${combinedErrorMessages}`,
      Error: 1,
    });
  } else {
    req.body = value;
    next();
  }
}

module.exports = validateRequest;
