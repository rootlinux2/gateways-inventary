import React, { useState, useEffect } from "react";
import { Col, Row } from "../Grid";
import Styles from "./index.module.css";
import { IconContext } from "react-icons";
import { BsPencilSquare, BsFillXSquareFill, BsEyeFill } from "react-icons/bs";
import Button from "../Utils/Button";

const PeripheralRow = ({ peripheral }) => {
  return (
    <Row className={Styles.wrapper}>
      <Col size={1.5} className={Styles.column}>
        <span className={Styles.label}>uuid:</span>
        <span className={Styles.value}>{peripheral.uuid}</span>
      </Col>
      <Col size={1.2} className={Styles.column}>
        <span className={Styles.label}>vendor:</span>
        <span className={Styles.value}>{peripheral.vendor}</span>
      </Col>
      <Col size={0.9} className={Styles.column}>
        <span className={Styles.label}>dateCreated:</span>
        <span className={Styles.value}>{peripheral.dateCreated}</span>
      </Col>
      <Col size={0.9} className={Styles.column}>
        <span className={Styles.label}>status:</span>
        <span className={Styles.value}>{peripheral.status}</span>
      </Col>

      <Col size={0.1} className={Styles.column}>
        <IconContext.Provider value={{ size: "1.3em" }}>
          <div className={Styles.btnWrapper}>
            <Button title="edit" color="black" border="none" margin="0">
              <BsPencilSquare />
            </Button>
            <Button title="delete" color="black" border="none" margin="0">
              <BsFillXSquareFill />
            </Button>
          </div>
        </IconContext.Provider>
      </Col>
    </Row>
  );
};

export default PeripheralRow;
