import { createPortal } from "react-dom";
import classes from "./Snackbar.module.css";

const Snackbar = (props) => {
  const content = (
    <div className={classes.container}>
      {props.trashCan.length} item{props.trashCan.length > 1 ? "s" : null}{" "}
      deleted
      <button onClick={props.undoDeletedItem} className={classes.button}>
        Undo
      </button>
    </div>
  );

  return createPortal(content, document.getElementById("overlays"));
};

export default Snackbar;
