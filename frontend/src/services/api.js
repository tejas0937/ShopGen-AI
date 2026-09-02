const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000/api";


async function getCsrfToken() {
  const response = await fetch(`${API_BASE_URL}/csrf/`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to get CSRF token");
  }

  return response.json();
}


async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || data.detail || "Something went wrong"
    );
  }

  return data;
}


export async function registerUser(formData) {
  const csrfData = await getCsrfToken();

  return apiRequest("/register/", {
    method: "POST",
    headers: {
      "X-CSRFToken": csrfData.csrfToken,
    },
    body: JSON.stringify({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    }),
  });
}


export async function loginUser(formData) {
  const csrfData = await getCsrfToken();

  return apiRequest("/login/", {
    method: "POST",
    headers: {
      "X-CSRFToken": csrfData.csrfToken,
    },
    body: JSON.stringify({
      username: formData.username,
      password: formData.password,
    }),
  });
}


export async function logoutUser() {
  const csrfData = await getCsrfToken();

  return apiRequest("/logout/", {
    method: "POST",
    headers: {
      "X-CSRFToken": csrfData.csrfToken,
    },
  });
}


export async function fetchCurrentUser() {
  return apiRequest("/me/");
}