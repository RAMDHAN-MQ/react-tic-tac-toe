import { useEffect } from "react";
import Kotak from "./Kotak";
import { cariPemenang } from "../utils/CariPemenang";

export default function Papan({ kotaks, xIsNext, onPlay, skorX, skorO, mode }) {
  function handleClick(i) {
    if (kotaks[i] || cariPemenang(kotaks)) return;
    if (mode === "ai" && !xIsNext) return;
    const kotaksBaru = kotaks.slice();
    kotaksBaru[i] = xIsNext ? "X" : "O";
    onPlay(kotaksBaru);
  }

  function aiRandom(kotakSekarang) {
    const kotakKosong = [];
    for (let i = 0; i < kotakSekarang.length; i++) {
      if (kotakSekarang[i] === null) kotakKosong.push(i);
    }

    if (kotakKosong.length === 0) return;

    const acakAI = Math.floor(Math.random() * kotakKosong.length);
    const indexAI = kotakKosong[acakAI];
    const kotaksBaru = kotakSekarang.slice();
    kotaksBaru[indexAI] = "O";
    onPlay(kotaksBaru);
  }

  useEffect(() => {
    if (mode === "ai" && !xIsNext && !cariPemenang(kotaks)) {
      aiRandom(kotaks);
    }
  }, [kotaks, xIsNext, mode]);

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
