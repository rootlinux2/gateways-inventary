import Link from "next/link";
import styles from "../styles/Home.module.css";
import Layout from "../Components/Layout";
import { Col, Grid, Row } from "../Components/Grid";

export default function Home() {
  return (
    <Layout>
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
              <Link href="/gateways">
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
