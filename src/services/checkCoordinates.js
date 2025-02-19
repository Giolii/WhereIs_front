const checkCoordinate = async (char, x, y) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/game/position?x=${x}&y=${y}&char=${char}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch character");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || error);
  }
};
export default checkCoordinate;
