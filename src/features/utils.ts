import axios from "axios";

export const djangoUrl = "http://127.0.0.1:8000";

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const data = error.response.data;
      if (typeof data === "string") {
        return data;
      } else if (data?.detail) {
        return data.detail;
      } else {
        return JSON.stringify(data);
      }
    }
  }
  return (error as Error).message || "An unknown error occurred";
};
