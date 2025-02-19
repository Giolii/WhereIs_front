import { useEffect, useState } from "react";

const Toast = ({ message, duration = 2000 }) => {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (message) {
      setShouldRender(true);
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);
      const unmountTimer = setTimeout(() => {
        setShouldRender(false);
      }, duration + 300);
      return () => {
        clearTimeout(timer);
        clearTimeout(unmountTimer);
      };
    }
  }, [message, duration]);
  if (!shouldRender) return null;
  return (
    <div
      className={`fixed top-4 left-1/2 p-4 bg-black text-white rounded shadow-lg transition-opacity duration-300 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;
