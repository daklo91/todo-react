import { Fragment } from "react";
import { createPortal } from "react-dom";
import classes from "./ClearAllModal.module.css";

const BackDrop = (props) => {
  return <div onClick={props.closeModal} className={classes.backdrop}></div>;
};

const Modal = (props) => {
  return (
    <div className={classes.modal}>
      Are you sure?
      <div className={classes["button-container"]}>
        <button
          tabIndex={1}
          onClick={() => props.closeModal("yes")}
          className={classes.button}
          autoFocus
        >
          Yes
        </button>
        <button
          onClick={props.closeModal}
          className={classes.button}
          tabIndex={1}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const ClearAllModal = (props) => {
  return (
    <Fragment>
      {createPortal(
        <BackDrop closeModal={props.closeModal} />,
        document.getElementById("overlays")
      )}
      {createPortal(
        <Modal closeModal={props.closeModal} />,
        document.getElementById("overlays")
      )}
    </Fragment>
  );
};

export default ClearAllModal;
