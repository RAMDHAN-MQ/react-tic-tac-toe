import { useState } from "react";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [move, setMove] = useState(0);
  const kotakSaatIni = history[move];
  const xIsNext = move % 2 === 0;

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
          disabled={pem !== "undefined"}
        >
          {deskripsi}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-papan">
        <Papan
          kotaks={kotakSaatIni}
          xIsNext={xIsNext}
          onPlay={handlePlay}
          skorX={skorX}
          skorO={skorO}
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

function Papan({ kotaks, xIsNext, onPlay, skorX, skorO }) {
  function handleClick(i) {
    if (kotaks[i] || cariPemenang(kotaks)) return;
    const kotaksBaru = kotaks.slice();
    kotaksBaru[i] = xIsNext ? "X" : "O";
    onPlay(kotaksBaru);
  }

  const pemenang = cariPemenang(kotaks);
  const draw = !pemenang && kotaks.every((e) => e !== null);
  let status;
  if (pemenang) {
    status = `${pemenang} MENANG`;
  } else if (draw) {
    status = "DRAW!";
  } else {
    status = (xIsNext ? "X" : "O") + " Gerak";
  }

  return (
    <div className="papan">
      <div className="papan-status">
        <span>{status}</span>
      </div>
      <div className="papan-game">
        <div className="baris">
          <Kotak value={kotaks[0]} onClickBtn={() => handleClick(0)} />
          <Kotak value={kotaks[1]} onClickBtn={() => handleClick(1)} />
          <Kotak value={kotaks[2]} onClickBtn={() => handleClick(2)} />
        </div>
        <div className="baris">
          <Kotak value={kotaks[3]} onClickBtn={() => handleClick(3)} />
          <Kotak value={kotaks[4]} onClickBtn={() => handleClick(4)} />
          <Kotak value={kotaks[5]} onClickBtn={() => handleClick(5)} />
        </div>
        <div className="baris">
          <Kotak value={kotaks[6]} onClickBtn={() => handleClick(6)} />
          <Kotak value={kotaks[7]} onClickBtn={() => handleClick(7)} />
          <Kotak value={kotaks[8]} onClickBtn={() => handleClick(8)} />
        </div>
      </div>
      <div className="papan-skor">
        <span className="skor x">X: {skorX}</span>
        <span>Vs</span>
        <span className="skor o">O: {skorO}</span>
      </div>
    </div>
  );
}

function Kotak({ value, onClickBtn }) {
  return (
    <button
      className={value === "X" ? "tombol x" : "tombol o"}
      onClick={onClickBtn}
    >
      {value}
    </button>
  );
}

function cariPemenang(kotaks) {
  const lists = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lists.length; i++) {
    const [a, b, c] = lists[i];
    if (kotaks[a] && kotaks[a] === kotaks[b] && kotaks[a] === kotaks[c]) {
      return kotaks[a];
    }
  }
}
