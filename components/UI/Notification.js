import classes from "./Notification.module.css";

const Notification = (props) => {
    let notificationClasses = '';

    if (props.status === 'success'){
        notificationClasses = classes.success;
    }
    if(props.status === 'error') {
        notificationClasses = classes.error;
    }
  return (
    <div className={classes.notify}>
      <p className={notificationClasses}>{props.message}</p>
    </div>
  );
};

export default Notification;
