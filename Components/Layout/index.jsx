
import styles from "./index.module.css";
import { Grid } from "../Grid";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <Grid>
      <ToastContainer />
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" />
      </Head>
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
