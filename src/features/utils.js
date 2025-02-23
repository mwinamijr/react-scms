export const djangoUrl = "http://127.0.0.1:8000";

export const getErrorMessage = (error) => {
  if (error.response) {
    if (error.response.data) {
      if (typeof error.response.data === "string") {
        return error.response.data;
      } else if (error.response.data.detail) {
        return error.response.data.detail;
      } else {
        return JSON.stringify(error.response.data);
      }
    }
  }
  return error.message || "An unknown error occurred";
};
