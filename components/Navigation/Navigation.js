import Link from "next/link";
import classes from "./Navigation.module.css";

function Navigation() {
  return (
    <nav className={classes.nav}>
      <ul className={classes.nav__items}>
        <li>MIMOS</li>

        <div className={classes.nav__actions}>
          <li>
            <Link href="/login">
            Login
            </Link>
            </li>
            <li>
            <Link href="/signup">
            SignUp
            </Link>
            </li>
        </div>
      </ul>
    </nav>
  );
}

export default Navigation;
