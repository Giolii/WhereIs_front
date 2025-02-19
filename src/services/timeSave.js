const timeSave = async (name) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/game/save`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );
    if (!response.ok) {
      throw new Error("Error saving the user time");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default timeSave;
