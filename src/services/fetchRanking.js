const fetchRanking = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/game/rank`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch ranking");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || error);
  }
};

export default fetchRanking;
