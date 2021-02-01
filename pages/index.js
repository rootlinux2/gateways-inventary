import Link from "next/link";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../Components/Layout";
import { Col, Grid, Row } from "../Components/Grid";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Gateways Suite</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid>
        <Row>
          <Col size={1}>
            <h1 className={styles.title}>Welcome to Gatways Suite</h1>
            <p className={styles.description}>
              Here you can handle your peripherals devices
            </p>
          </Col>
        </Row>
        <Row>
          <Col size={1}>
            <div className={styles.panel}>
              <Link
                href={{
                  pathname: "/gateways",
                  query: { offset: 0 },
                }}
              >
                <a className={styles.card}>
                  <h3>Gateways &rarr;</h3>
                  <p>All availables gateways</p>
                </a>
              </Link>
            </div>
          </Col>
        </Row>
      </Grid>
    </Layout>
  );
}
