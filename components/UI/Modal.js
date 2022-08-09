// import { Fragment } from 'react';
// import ReactDOM from 'react-dom';

// import classes from './Modal.module.css';

// const Backdrop = (props) => {
//   return <div className={classes.backdrop} onClick={props.onClose} />;
// };

// const ModalOverlay = (props) => {
//   return (
//     <div className={classes.modal}>
//       <div className={classes.content}>{props.children}</div>
//     </div>
//   );
// };

// const portalElement = document.getElementById('overlays');

// const Modal = (props) => {
//   return (
//     <Fragment>
//       {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
//       {ReactDOM.createPortal(
//         <ModalOverlay>{props.children}</ModalOverlay>,
//         portalElement
//       )}
//     </Fragment>
//   );
// };

// export default Modal;

import { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import { MdClose } from "react-icons/md";

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.close__container}>
        <MdClose onClick={props.onClose} className={classes.close} />
      </div>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
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

  // const modalContent = show ? (
  //   <div className={classes.modal}>
  //     <div className={classes.content}>{props.children}</div>
  //   </div>
  // ) : null;

  const portalElement = document.getElementById("modal-root");

  if (isBrowser) {
    // return ReactDOM.createPortal(modalContent, portalElement);

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
