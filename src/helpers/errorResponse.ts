import { Response } from 'express';

interface ErrorObject {
  message: string;
  statusCode: number;
}

const errorResponse = (
  res: Response,
  error: ErrorObject,
  controller: string
) => {
  console.log(`ERROR FROM ${controller} CONTROLLER`);
  return res.status(error.statusCode || 500).json({
    message: error.message || 'Something went wrong',
  });
};

export default errorResponse;
