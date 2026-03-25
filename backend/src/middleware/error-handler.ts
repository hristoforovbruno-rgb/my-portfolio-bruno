import type { NextFunction, Request, Response } from "express";

export function errorHandler(error: unknown, _request: Request, response: Response, _next: NextFunction) {
  void _next;
  console.error(error);

  if (error instanceof Error) {
    response.status(500).json({ error: error.message });
    return;
  }

  response.status(500).json({ error: "Internal server error." });
}
