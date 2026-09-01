const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

function getCookie(name) {
  const cookieValue = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`));

  return cookieValue ? decodeURIComponent(cookieValue.split("=")[1]) : "";
}

export async function getCsrfToken() {
  const response = await fetch(`${API_BASE_URL}/csrf/`, {
    credentials: "include",
  });

  if (!response.ok) {
    const fallbackToken = getCookie("csrftoken");
    if (fallbackToken) return fallbackToken;
    throw new Error("Unable to fetch CSRF token");
  }

  const data = await response.json();
  return data.csrfToken || getCookie("csrftoken");
}

export async function apiFetch(path, options = {}) {
  const csrfToken = await getCsrfToken();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(csrfToken ? { "X-CSRFToken": csrfToken } : {}),
    },
  });

  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();
  const payload = text && contentType.includes("application/json") ? JSON.parse(text) : text;

  if (!response.ok) {
    const message = typeof payload === "object" ? payload.detail || payload.error || payload.message : payload;
    throw new Error(message || "Request failed");
  }

  return payload || null;
}

export async function registerUser(data) {
  return apiFetch("/register/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function loginUser(data) {
  return apiFetch("/login/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function logoutUser() {
  return apiFetch("/logout/", {
    method: "POST",
  });
}

export async function fetchCurrentUser() {
  return apiFetch("/me/", {
    method: "GET",
  });
}
