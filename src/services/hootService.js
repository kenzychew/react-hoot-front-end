const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/hoots`;

async function index() {
  const url = BASE_URL;
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json.hoots;
  } catch (error) {
    console.error(error.message);
  }
}

async function show(hootId) {
  const url = `${BASE_URL}/${hootId}`;
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    if (!json.hoot) {
      throw new Error("Hoot not found");
    }
    return json.hoot;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export { index, show };
