
import styles from "./index.module.css";
import Image from "next/image";
import { Grid } from "../Grid";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ children }) {
  return (
    <Grid>
      <ToastContainer />
      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <a
          href="http://www.google.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Me!
         
        </a>
      </footer>
    </Grid>
  );
}
