export const ctrlWrapper = (controller) => {
  return (req, res, next) => {
    try {
        await controller(req, res, next)
    } catch (error) {
      next(error);
    }
  };
};
