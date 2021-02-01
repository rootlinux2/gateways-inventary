import React, { useState, useEffect } from "react";
import { Grid, Row } from "../Grid";
import Styles from "./index.module.css";

const Accordion = () => {
  const [collapse, setCollapse] = useState(false);

  return (
    <Grid>
      <Row>
        <div className={Styles.header}>
            <h3>header</h3>
        </div>
      </Row>
      <Row>
        <div className={Styles.collapse}>
            <h3>Collapse body</h3>
        </div>
      </Row>
    </Grid>
  );
};

export default Accordion;



