import classes from "./TodoItem.module.css";

function TodoItem(props) {
  function completeToggle() {
    props.completeToggle(props.id);
  }

  function deleteTodoItem() {
    props.handleDeleteTodoItem(props.id);
  }

  return (
    <li
      draggable="true"
      onDragStart={() => props.handleDndGetDraggedItemId(props.id)}
      onDrop={() => props.handleDndGetDropOverItemId(props.id)}
    >
      <div className={classes.groupCheckmarkText}>
        <button className={classes.checkmarkButton} onClick={completeToggle}>
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
          className={`${classes.text} ${
            props.complete === true ? classes.textComplete : null
          }`}
        >
          {props.text}
        </div>
      </div>
      <button className={classes.svgButton} onClick={deleteTodoItem}>
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
  );
}

export default TodoItem;
