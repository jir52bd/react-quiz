import classes from "../styles/Button.module.css";

export default function Button({ className, children }) {
  return (
    <button className={`${classes.button} ${classes.button}`}>
      {children}
    </button>
  );
}
