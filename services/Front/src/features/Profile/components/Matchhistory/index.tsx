import GameResult from "../Gameresult";

var results: JSX.Element[] = [];

for (let i = 0; i < 5; i++) {
  results.push(<GameResult key={i * 100} />);
}

function MatchHistory() {
  return (
    <div className="rounded-2xl bg-spaceCadet p-2 md:p-4 flex flex-col gap-2">
      <h2 className="mb-2 capitalize text-xl md:text-3xl">match History</h2>
      <ul>{results}</ul>
    </div>
  );
}

export default MatchHistory;
