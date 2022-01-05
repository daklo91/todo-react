import { createPortal } from "react-dom";
import classes from "./Snackbar.module.css";

const Snackbar = (props) => {
  const content = (
    <div
      className={`${classes.container} ${
        props.hideWhen === true ? classes.hide : null
      } ${props.timer === false ? classes.hide : null}`}
      style={{ bottom: props.botPosition }}
    >
      {props.children}
      {props.function ? (
        <button onClick={props.function} className={classes.button}>
          Undo
        </button>
      ) : null}
    </div>
  );

  return createPortal(content, document.getElementById("overlays"));
};

export default Snackbar;
