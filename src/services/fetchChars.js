const fetchChars = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/game/chars`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch characters");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || error);
  }
};
export default fetchChars;
