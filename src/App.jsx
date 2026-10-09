import { useState } from "react";
import { cariPemenang } from "./utils/CariPemenang";
import Papan from "./components/Papan";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [move, setMove] = useState(0);
  const kotakSaatIni = history[move];
  const xIsNext = move % 2 === 0;
  const [mode, setMode] = useState("lokal");
  const [skorX, setSkorX] = useState(0);
  const [skorO, setSkorO] = useState(0);

  function handlePlay(kotaksBaru) {
    const pemenang = cariPemenang(kotaksBaru);
    if (pemenang === "X") {
      setSkorX((e) => e + 1);
    } else if (pemenang === "O") {
      setSkorO((e) => e + 1);
    }

    const historyBaru = [...history.slice(0, move + 1), kotaksBaru];
    setHistory(historyBaru);
    setMove(historyBaru.length - 1);
  }

  function handleJumpTo(i) {
    setMove(i);
  }

  function handleReset() {
    location.reload();
  }

  function handleNext() {
    setHistory([Array(9).fill(null)]);
    setMove(0);
  }

  const listHistory = history.map((e, i) => {
    const pem = cariPemenang(kotakSaatIni);
    let deskripsi = i > 0 ? `Lompat ke #${i}` : "Permainan dimulai";
    return (
      <li key={i}>
        <button
          onClick={() => {
            handleJumpTo(i);
          }}
          disabled={pem !== undefined}
        >
          {deskripsi}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-mode">
        <button
          onClick={() => setMode("lokal")}
          className={mode === "lokal" ? "active" : ""}
        >
          Lokal
        </button>
        <button
          onClick={() => setMode("ai")}
          className={mode === "ai" ? "active" : ""}
        >
          VS Komputer
        </button>
      </div>
      <div className="game-papan">
        <Papan
          kotaks={kotakSaatIni}
          xIsNext={xIsNext}
          onPlay={handlePlay}
          skorX={skorX}
          skorO={skorO}
          mode={mode}
        />
      </div>
      <div className="game-history">
        <ol>{listHistory}</ol>
        <div className="game-control">
          <button className="btn-reset" onClick={handleReset}>
            Ulangi
          </button>
          <button className="btn-next" onClick={handleNext}>
            Lanjut
          </button>
        </div>
      </div>
    </div>
  );
}
