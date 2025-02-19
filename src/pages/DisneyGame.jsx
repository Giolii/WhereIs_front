import { useEffect, useState } from "react";
import fetchChars from "../services/fetchChars";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";
import checkCoordinate from "../services/checkCoordinates";
import Toast from "../components/common/Toast";
import timeEnd from "../services/timeEnd";
import timeSave from "../services/timeSave";
import timeStart from "../services/timeStart";
import { useNavigate } from "react-router-dom";

const DisneyGame = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cursorCoord, setCursorCoord] = useState({});
  const [charsToFind, setCharsToFind] = useState([]);
  const [showChars, setShowChars] = useState(false);
  const [coordinateResult, setCoordinateResult] = useState({});
  const [gameStatus, setGameStatus] = useState(null);

  const startGame = async () => {
    try {
      const data = await fetchChars();
      setCharsToFind(data);
      await timeStart();
    } catch (error) {
      setError(error.message || String(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    startGame();
  }, []);

  const handleClickCharacter = async (char) => {
    try {
      const response = await checkCoordinate(
        char,
        cursorCoord.x,
        cursorCoord.y
      );
      setCoordinateResult(response);
      if (response.valid) {
        setCharsToFind((prev) =>
          prev.filter((singleChar) => singleChar.name !== char)
        );
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setShowChars(false);
    }
  };

  const handleClickImage = (e) => {
    setCursorCoord({ x: e.pageX, y: e.pageY });
    setShowChars(!showChars);
  };

  const handleEnd = async () => {
    const end = await timeEnd();
    const name = prompt(`Time:${end.totalTime}, Your username?`);
    const save = await timeSave(name);
    console.log(save);
    navigate("/ranking");
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (charsToFind.length === 0) handleEnd();

  return (
    <div>
      {coordinateResult && (
        <Toast
          key={coordinateResult.timestamp}
          message={coordinateResult.message}
        />
      )}
      {showChars && (
        <div
          className="absolute bg-amber-50  rounded-md"
          style={{
            left: `${cursorCoord.x + 10}px`,
            top: `${cursorCoord.y + 10}px`,
          }}
        >
          {charsToFind.map((char) => (
            <div
              onClick={() => handleClickCharacter(char.name)}
              className="border py-2 px-4 cursor-pointer hover:bg-gray-200"
              key={char.id}
            >
              {char.name}
            </div>
          ))}
        </div>
      )}
      <img
        onClick={(e) => handleClickImage(e)}
        style={{
          minWidth: "1800px",
          minHeight: "1000px",
        }}
        src="/huge_disneyland.jpg"
        alt="Disneyland"
      />
    </div>
  );
};

export default DisneyGame;
