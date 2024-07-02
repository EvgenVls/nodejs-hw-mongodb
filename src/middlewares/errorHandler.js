import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: { message: 'Contact not found' },
    });
    return;
  }

  const { status = 500, message = 'Something went wrong' } = err;
  res.status(status).json({
    status,
    message,
    data: err.message,
  });
};
