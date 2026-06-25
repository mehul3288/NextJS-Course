const DB_URL =
  process.env.DB_URL;

async function request(
  endpoint,
  options = {}
) {
  const response =
    await fetch(
      `${DB_URL}${endpoint}`,
      {
        headers: {
          "Content-Type":
            "application/json"
        },
        ...options
      }
    );

  if (!response.ok) {
    throw new Error(
      "Database request failed"
    );
  }

  const text =
    await response.text();

  return text
    ? JSON.parse(text)
    : null;
}

const db = {
  get(endpoint) {
    return request(endpoint);
  },

  post(endpoint, body) {
    return request(endpoint, {
      method: "POST",
      body: JSON.stringify(body)
    });
  },

  patch(endpoint, body) {
    return request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body)
    });
  },

  delete(endpoint) {
    return request(endpoint, {
      method: "DELETE"
    });
  }
};

module.exports = { db };