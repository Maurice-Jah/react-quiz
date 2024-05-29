function Progress({ numQuestions, index, maxPossiblePoints, points, answer }) {
  console.log(answer);
  return (
    <header className="progress">
      <progress
        min={index}
        max={numQuestions}
        value={index + Number(answer !== null)}
      />
      <p>
        Question <strong>{index + 1} </strong> / {numQuestions}
      </p>
      <p>
        <strong>{points} </strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
