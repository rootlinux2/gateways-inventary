import React from "react";
import { IconContext } from "react-icons";
import { BsPlusSquareFill } from "react-icons/bs";
import { Col, Grid, Row } from "../Grid";
import Button from "../Utils/Button";
import Styles from "./index.module.css";

function ActionRow({
  handleAddAction = () => {},
  total,
  title,
  showButton = true,
}) {
  return (
    <Grid>
      <Row>
        <Col size={1}>
          <div className={Styles.wrapper}>
            <span>{`${total} - ${title}`}</span>
            {showButton && (
              <IconContext.Provider value={{ size: "1.5em" }}>
                <div className={Styles.btnWrapper}>
                  <Button
                    title="Add"
                    color="black"
                    border="none"
                    margin="0"
                    onClick={() => handleAddAction()}
                  >
                    <BsPlusSquareFill />
                  </Button>
                </div>
              </IconContext.Provider>
            )}
          </div>
        </Col>
      </Row>
    </Grid>
  );
}

export default ActionRow;
