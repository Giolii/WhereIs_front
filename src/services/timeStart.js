const timeStart = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/game/start`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error starting the game stopwatch");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default timeStart;
