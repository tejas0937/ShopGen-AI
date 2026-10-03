const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8000/api";


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
  const response = await fetch(`${API_BASE_URL}/me/`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch current user");
  }

  return response.json();
}

export async function fetchProducts() {
  const response = await fetch(`${API_BASE_URL}/products/`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function fetchProduct(productId) {
  const response = await fetch(`${API_BASE_URL}/products/${productId}/`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}

export async function trackInteraction(productId, interactionType) {
  const csrfData = await getCsrfToken();

  const response = await fetch(`${API_BASE_URL}/interactions/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfData.csrfToken,
    },
    body: JSON.stringify({
      product_id: productId,
      interaction_type: interactionType,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || data.detail || "Failed to track interaction"
    );
  }

  return data;
}

export async function fetchRecommendations() {
  const response = await fetch(`${API_BASE_URL}/recommendations/`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  return response.json();
}