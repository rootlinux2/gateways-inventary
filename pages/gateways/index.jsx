import React, { useEffect } from "react";
import Head from 'next/head';
import styles from "./index.module.css";
import Layout from "../../Components/Layout";
import { Col, Grid, Row } from "../../Components/Grid";
import { toast } from "react-toastify";

export default function Gateways() {
    useEffect(()=>{
        toast.success("Page loaded!")
    },[]);
  return (
    <Layout>
     <Head>
        <title>GS - Gateways</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid>
        <Row>
          <Col size={1}>
            <h1 className={styles.title}>Gatways</h1>
          </Col>
        </Row>
      </Grid>
    </Layout>
  );
}
