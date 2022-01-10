import classes from "./TodoItem.module.css";
import { Draggable } from "react-beautiful-dnd";
import Confetti from "react-dom-confetti";
import confettiConfig from "../../assets/config/confettiConfig";
import { useEffect, useRef, useState } from "react";
import { Fragment } from "react";

function TodoItem(props) {
  const [fadeState, setFadeState] = useState(false);
  const [textHighlight, setTextHighlight] = useState(false);
  const [showText, setShowText] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const leaveTimer = useRef(null);
  const doubleTapTimer = useRef(null);
  const textHighlightTimer = useRef(null);
  // const liRef = useRef(null);
  const textRef = useRef(null);

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
    doubleTapTimer.current = setTimeout(() => {
      clicks = 0;
    }, 1000);
    if (clicks === 2) {
      setTextHighlight(true);
      textHighlightTimer.current = setTimeout(() => {
        setTextHighlight(false);
      }, 500);
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
      setShowText(false);
      setFadeState(true);
    } else if (props.filterState === true && props.complete === false) {
      setShowText(false);
      setFadeState(false);
    } else if (props.filterState === false && props.complete === true) {
      setShowText(false);
      setFadeState(false);
    }
  }, [props.filterState, props.complete]);

  useEffect(() => {
    return () => {
      clearTimeout(leaveTimer.current);
      clearTimeout(doubleTapTimer.current);
      clearTimeout(textHighlightTimer.current);
    };
  }, []);

  useEffect(() => {
    if (props.deleteAllAnimation === true && props.complete === true) {
      setFadeState(false);
    }
  }, [props.complete, props.deleteAllAnimation]);

  const showMoreHandler = () => {
    setShowText(!showText);
    setHasClicked(true);
  };

  const isEllipsis = textRef.current
    ? textRef.current.scrollHeight > textRef.current.clientHeight ||
      textRef.current.scrollWidth > textRef.current.clientWidth
    : null;

  return (
    <Fragment>
      <Confetti active={props.complete} config={confettiConfig} />
      <Draggable
        draggableId={props.id}
        index={props.index}
        isDragDisabled={!fadeState}
      >
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <li
              title="Left click and hold to drag"
              className={`${snapshot.isDragging ? classes.isDragging : null} ${
                fadeState === true ? classes.fade : null
              }`}
              onClick={clearSelection}
              style={showText ? { maxHeight: "1000rem" } : null}
            >
              <div className={classes.groupCheckmarkText}>
                <button
                  tabIndex={fadeState ? 0 : -1}
                  className={classes.checkmarkButton}
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                  onClick={completeToggle}
                  title={
                    props.complete === true
                      ? "Uncomplete this todo"
                      : "Complete this todo"
                  }
                >
                  <span
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
                      <span className={classes.checkmark}></span>
                    )}
                  </span>
                </button>
                <div>
                  <div
                    title="Double-click to copy text to clipboard"
                    ref={textRef}
                    id={props.id}
                    onClick={(e) => targetText(e, props.id)}
                    className={`${classes.text} ${
                      props.complete === true ? classes.textComplete : null
                    } ${textHighlight ? classes.highLight : null} ${
                      showText ? classes.showText : null
                    }`}
                  >
                    {props.text}
                  </div>
                  {isEllipsis || hasClicked ? (
                    <button
                      onMouseDown={(e) => {
                        e.preventDefault();
                      }}
                      tabIndex={fadeState ? 0 : -1}
                      title={
                        !showText
                          ? "Show the rest of the text"
                          : "Hide the text"
                      }
                      className={classes.showMore}
                      onClick={showMoreHandler}
                    >
                      {!showText ? <span>show</span> : <span>hide</span>}
                    </button>
                  ) : null}
                </div>
              </div>
              <button
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                tabIndex={fadeState ? 0 : -1}
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
