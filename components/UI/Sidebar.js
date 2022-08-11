import { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Sidebar.module.css";

const ModalOverlay = (props) => {
  return (
    <div className={classes.dropdown__modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Backdrop = (props) => {
  return <div className={classes.dropdown__backdrop} onClick={props.onClose} />;
};

function Modal(props) {
  const [isBrowser, setIsBrowser] = useState(false);

  // const { show, onClose, children } = props;

  useEffect(() => {
    const getResult = async () => {
      setIsBrowser(true);
    };

    getResult();
  }, []);

  const portalElement = document.getElementById("modal-root");

  if (isBrowser) {
    return (
      <Fragment>
        {ReactDOM.createPortal(
          <Backdrop onClose={props.onClose} />,
          portalElement
        )}
        {ReactDOM.createPortal(
          <ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>,
          portalElement
        )}
      </Fragment>
    );
  } else {
    return null;
  }
}

export default Modal;
