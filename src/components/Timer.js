import { useEffect } from "react";

function Timer({ secondsRemaining, dispatch }) {
  const mins = Math.floor(secondsRemaining / 60);
  const secs = Math.floor(secondsRemaining % 60);

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },

    [dispatch]
  );

  return (
    <p className="timer">
      {mins < 10 ? `0${mins}` : mins}:{secs < 10 && "0"}
      {secs}
    </p>
  );
}

export default Timer;
