import classes from './Button.module.css';

const Button = (props) => {
 return <button className={classes.cart_button} onClick={props.onClick}>Add to cart</button>
};

export default Button;