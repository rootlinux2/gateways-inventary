import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "./index.module.css";
import Layout from "../../Components/Layout";
import { Col, Grid, Row } from "../../Components/Grid";
import { toast } from "react-toastify";
import GatewaysRow from "../../Components/GatewayRow";
import Axios from "axios";
import Spinner from "../../Components/Spinner";
import ReactPaginate from "react-paginate";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { useRouter } from "next/router";

export default function Gateways({offset}) {
  //   const [gateways, setGateways] = useState([]);
  const [gatewaysF, setgatewaysF] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagesCount, setPagesCount] = useState(0);
  //   const [offset, setOffset] = useState(0);
  const router = useRouter();

  const limit = 5;

  useEffect(() => {
    setLoading(true);
    Axios.get(`api/gateways?limit=${limit}&skip=${router.query.offset}`).then(
      (response) => {
        setgatewaysF([...response.data.docs]);
        setPagesCount(response.data.metadata.total / limit);
        toast.success("data loaded!");
        setLoading(false);
      }
    );
  }, [router.query]);

  return (
    <Layout>
      <Head>
        <title>GS - Gateways</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid>
        <Row>
          <Col size={1} className={styles.titleWrapper}>
            <h1 className={styles.title}>Gatways</h1>
          </Col>
        </Row>
        {loading ? (
          <Grid className={styles.loadingWrapper}>
            <Spinner radius="34px" />
          </Grid>
        ) : (
          <Grid className={styles.listWrapper}>
          <ol>

            {gatewaysF &&
              gatewaysF.length > 0 &&
              gatewaysF.map((g) => <li key={g.name}><GatewaysRow gateway={g} /></li>)}
          </ol>
          </Grid>
        )}
        <Row className={styles.paginationWrapper}>
          <ReactPaginate
            previousLabel={<BsChevronCompactLeft />}
            nextLabel={<BsChevronCompactRight />}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pagesCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            // forcePage={parseInt(offset, 10)}
            onPageChange={(e) => {
              if(e.selected &&  parseInt(router.query.offset, 10) !== e.selected){
              router.push({
                pathname: "/gateways",
                query: { offset: e.selected },
              });
              }
            }}
            containerClassName={styles.pagination}
            pageLinkClassName={styles.pages}
            activeClassName={styles.active}
            activeLinkClassName={styles.activeLink}
            previousClassName={styles.previousClassName}
            nextClassName={styles.nextClassName}
            previousLinkClassName={styles.previousLinkClassName}
            nextLinkClassName={styles.nextLinkClassName}
          />
        </Row>
      </Grid>
    </Layout>
  );
}
