export const djangoUrl = "http://127.0.0.1:8000";

export const getErrorMessage = (error: any): string => {
  if (error?.response?.data) {
    const data = error.response.data;

    // Case 1: String error response (e.g., "Invalid token")
    if (typeof data === "string") {
      return data;
    }

    // Case 2: 'detail' is a string (e.g., {"detail": "Invalid credentials"})
    if (typeof data.detail === "string") {
      return data.detail;
    }

    // Case 3: 'detail' is an object (e.g., {"detail": {"id": ["This field is required."]}})
    if (typeof data.detail === "object") {
      return Object.entries(data.detail)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return `${key}: ${value.join(", ")}`;
          }
          return `${key}: ${value}`;
        })
        .join(" | ");
    }

    // Case 4: Field-specific errors without 'detail' key (e.g., {"username": ["This field is required."]})
    if (typeof data === "object") {
      return Object.entries(data)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return `${key}: ${value.join(", ")}`;
          }
          return `${key}: ${value}`;
        })
        .join(" | ");
    }
  }

  // Fallback for unknown errors
  return error?.message || "An unknown error occurred.";
};
