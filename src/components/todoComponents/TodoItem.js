import classes from "./TodoItem.module.css";
import { Draggable } from "react-beautiful-dnd";
import Confetti from "react-dom-confetti";
import confettiConfig from "../../assets/config/confettiConfig";
import { useEffect, useRef, useState } from "react";
import { Fragment } from "react";

function TodoItem(props) {
  const [fadeState, setFadeState] = useState(false);
  const leaveTimer = useRef(null);
  function completeToggle() {
    props.completeToggle(props.id);
  }

  function deleteTodoItem() {
    setFadeState(false);
    leaveTimer.current = setTimeout(() => {
      props.handleDeleteTodoItem(props.id);
    }, 500);
  }

  let clicks = 0;
  const targetText = (e, id) => {
    e.stopPropagation();
    clicks++;
    setTimeout(() => {
      clicks = 0;
    }, 1000);
    if (clicks === 2) {
      // // window.getSelection().selectAllChildren(document.getElementById(id));

      // /* Get the text field */
      // var copyText = document.getElementById(id);

      // /* Select the text field */
      // copyText.select();
      // copyText.setSelectionRange(0, 99999); /* For mobile devices */

      // /* Copy the text inside the text field */
      // navigator.clipboard.writeText(copyText.value);

      // /* Alert the copied text */
      // alert("Copied the text: " + copyText.value);
      navigator.clipboard.writeText(props.text);
      props.copyText();
    }
  };

  function clearSelection() {
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else if (document.selection) {
      document.selection.empty();
    }
  }

  useEffect(() => {
    setFadeState(true);
    if (props.filterState === "all") {
      setFadeState(true);
    } else if (props.filterState === true && props.complete === false) {
      setFadeState(false);
    } else if (props.filterState === false && props.complete === true) {
      setFadeState(false);
    }
  }, [props.filterState, props.complete]);

  useEffect(() => {
    return () => {
      clearTimeout(leaveTimer.current);
    };
  }, []);

  useEffect(() => {
    if (props.deleteAllAnimation === true && props.complete === true) {
      setFadeState(false);
    }
  }, [props.complete, props.deleteAllAnimation]);

  return (
    <Fragment>
      <Confetti active={props.complete} config={confettiConfig} />
      <Draggable draggableId={props.id} index={props.index}>
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <li
              className={`${snapshot.isDragging ? classes.isDragging : null} ${
                fadeState === true ? classes.fade : null
              }`}
              onClick={clearSelection}
            >
              <div
                className={classes.groupCheckmarkText}
                title={
                  props.complete === true
                    ? "Uncomplete this todo"
                    : "Complete this todo"
                }
              >
                <button
                  className={classes.checkmarkButton}
                  onClick={completeToggle}
                >
                  <div
                    className={`
                ${classes.checkmarkBorder} ${
                      props.complete === true ? classes.checkMarkActive : null
                    }
              `}
                  >
                    {props.complete === true ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="9"
                        viewBox="0 0 11 9"
                        className={classes.checkSVG}
                      >
                        <path
                          fill="none"
                          stroke="#FFF"
                          strokeWidth="2"
                          d="M1 4.304L3.696 7l6-6"
                        />
                      </svg>
                    ) : (
                      <div className={classes.checkmark}></div>
                    )}
                  </div>
                </button>
                <div
                  id={props.id}
                  onClick={(e) => targetText(e, props.id)}
                  className={`${classes.text} ${
                    props.complete === true ? classes.textComplete : null
                  }`}
                >
                  {props.text}
                </div>
              </div>
              <button
                className={classes.svgButton}
                onClick={deleteTodoItem}
                title="Delete this todo"
              >
                <svg
                  className={classes.crossSVG}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.7851 0.471404L11.3137 0L5.89256 5.42115L0.471404 0L0 0.471404L5.42115 5.89256L0 11.3137L0.471404 11.7851L5.89256 6.36396L11.3137 11.7851L11.7851 11.3137L6.36396 5.89256L11.7851 0.471404Z"
                    fill="#494C6B"
                  />
                </svg>
              </button>
            </li>
          </div>
        )}
      </Draggable>
    </Fragment>
  );
}

export default TodoItem;
