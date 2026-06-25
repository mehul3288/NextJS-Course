import { ApiError } from "@/lib/errors";

export function getErrorMessage(
  error: unknown
) {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 400:
        return "Invalid request.";

      case 401:
        return "Please login again.";

      case 403:
        return "Access denied.";

      case 404:
        return "Resource not found.";

      case 500:
        return "Server error occurred.";

      default:
        return error.message;
    }
  }

  return "Something went wrong.";
}