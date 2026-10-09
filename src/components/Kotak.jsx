export default function Kotak({ value, onClickBtn }) {
  return (
    <button
      className={value === "X" ? "tombol x" : "tombol o"}
      onClick={onClickBtn}
    >
      {value}
    </button>
  );
}
