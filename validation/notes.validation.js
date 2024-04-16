const Joi = require("joi");
const notesValidation = async (req, res, next) => {
  try {
    const notesValidation = async (body) => {
      const joiSchema = await Joi.object({
        title: Joi.string().required().messages({
          "any.required": "title  is required.",
          "string.empty": "title cannot be empty.",
        }),
        body: Joi.string().required().messages({
          "any.required": "body  is required.",
          "string.empty": "body cannot be empty.",
        }),
      });
      return joiSchema.validate(body, {
        errors: { wrap: { label: "" } },
      });
    };
    const validation = await notesValidation(req.body);
    let response = {};
    if (validation.error) {
      let { details } = validation.error;
      const message = details.map((i) => i.message).join(", ");
      response.message = message;
      response.statusCode = 422;
      response.error = "ValidationError";
      return res.json(response);
    } else {
      next();
    }
  } catch (error) {
    console.log("validation error", error);
  }
};

module.exports = { notesValidation };
