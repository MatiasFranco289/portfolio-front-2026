import styles from "../css/TitleBorders.module.css";

export default function TitleBorders() {
  return (
    <div
      className={styles.title_borders} >
      <div className="absolute border-t-2 border-white h-1 top-0 left-0" />
      <div className="absolute border-l-2 border-white w-1 top-0 left-0" />

      <div className="absolute border-b-2 border-white h-1 bottom-0 right-0" />
      <div className="absolute border-r-2 border-white w-1 bottom-0 right-0" />
    </div>
  );
}