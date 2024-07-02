import createHttpError from 'http-errors';

const validateBody = (schema) => {
  const func = async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      const responceError = createHttpError(400, error.message, {
        errors: error.details,
      });
      next(responceError);
    }
  };

  return func;
};

export default validateBody;
