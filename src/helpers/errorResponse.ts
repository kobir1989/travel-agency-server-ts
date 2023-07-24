import { Response } from 'express';

interface ErrorObject {
  message?: string;
  statusCode?: number;
  errorCode?: string;
}

const errorResponse = (
  res: Response,
  error: ErrorObject,
  controller: string
) => {
  console.error(`ERROR FROM ${controller} CONTROLLER:`, error.message);
  // Return the error response to the client
  return res.status(error.statusCode || 500).json({
    error: {
      message: error.message || 'Something went wrong',
      code: error.errorCode || 'UNKNOWN_ERROR',
    },
  });
};

export default errorResponse;
