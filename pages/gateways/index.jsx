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
import { Animated } from "react-animated-css";

export default function Gateways() {
  //   const [gateways, setGateways] = useState([]);
  const [gatewaysF, setgatewaysF] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagesCount, setPagesCount] = useState(0);
  const [offset, setOffset] = useState(0);

  const limit = 5;

  useEffect(() => {
    setLoading(true);
    Axios.get(`api/gateways?limit=${limit}&skip=${offset}`).then((response) => {
      setgatewaysF([...response.data.docs]);
      setPagesCount(response.data.metadata.total / limit);
      toast.success("data loaded!");
      setLoading(false);
    });
  }, [offset]);

  const handleGatewayChange = (gtw) => {
    const tmp = gatewaysF.map((g) => {
      if (g._id === gtw._id) {
        return gtw;
      }
      return g;
    });

    setgatewaysF([...tmp]);
    toast.success("Gateway updated!");
  };

  const handleGatewayDelete = (gtw) => {
    const tmp = gatewaysF.filter((g) => g._id !== gtw._id);
    setgatewaysF([...tmp]);
    toast.success("Gateway deleted!");
  };

  return (
    <Layout>
      <Head>
        <title>GS - Gateways</title>
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
                gatewaysF.map((g) => (
                  <Animated
                    animationIn="fadeInUp"
                    animationOut="fadeOut"
                    animationInDelay={Math.floor(Math.random() * 100) + 1}
                    isVisible={true}
                  >
                    <li key={g.name}>
                      <GatewaysRow
                        gateway={g}
                        handleChange={handleGatewayChange}
                        handleDelete={handleGatewayDelete}
                      />
                    </li>
                  </Animated>
                ))}
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
            onPageChange={(e) => setOffset(e.selected)}
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
