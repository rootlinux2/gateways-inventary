import Head from "next/head";
import styles from "./index.module.css";
import Image from "next/image";
import { Grid } from "../Grid";


export default function Layout({ children }) {
  return (
    <Grid>
      <Head>
        <title>Gateways Suite</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <a
          href="http://www.musala.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <Image
            src="/Musala_Logo_white.svg"
            alt="Musala Soft"
            width={50}
            height={50}
            className={styles.logo}
          />
        </a>
      </footer>
      </Grid>
  );
}
