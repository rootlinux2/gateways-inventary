import React, { useState, useEffect } from "react";
import { Col, Row } from "../Grid";
import Styles from "./index.module.css";
import { IconContext } from "react-icons";
import { BsPencilSquare, BsFillXSquareFill, BsEyeFill } from "react-icons/bs";
import Button from "../Utils/Button";
import PeripheralRow from "../PripheralRow";

const GatewaysRow = ({ gateway }) => {
  const [showPeripherals, setShowPeripherals] = useState(false);
  return (
    <>
      <Row className={Styles.wrapper}>
        <Col size={1.5} className={Styles.column}>
          <span className={Styles.label}>Serial number:</span>
          <span className={Styles.value}>{gateway.serialNumber}</span>
        </Col>
        <Col size={1.2} className={Styles.column}>
          <span className={Styles.label}>Name:</span>
          <span className={Styles.value}>{gateway.name}</span>
        </Col>
        <Col size={0.9} className={Styles.column}>
          <span className={Styles.label}>IP:</span>
          <span className={Styles.value}>{gateway.ipAddress}</span>
        </Col>

        <Col size={0.1} className={Styles.column}>
          <IconContext.Provider value={{ size: "1.3em" }}>
            <div className={Styles.btnWrapper}>
              <Button
                title="show"
                color="black"
                border="none"
                margin="0"
                onClick={() => {
                  console.log("PERIFFFF: ", gateway);
                  setShowPeripherals(!showPeripherals);
                }}
              >
                <BsEyeFill />
              </Button>
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
      {showPeripherals && (
        <Row className={Styles.listWrapper} >
          <ol>
            {gateway.peripheral.length > 0 ? (
              gateway.peripheral.map((p) => <li key={p.uuid}><PeripheralRow peripheral={p} /></li>)
            ) : (
              <h1> No peripherals</h1>
            )}
          </ol>
        </Row>
      )}
    </>
  );
};

export default GatewaysRow;
