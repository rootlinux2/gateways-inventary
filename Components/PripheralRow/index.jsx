import React, { useState, useEffect } from "react";
import { Col, Row } from "../Grid";
import Styles from "./index.module.css";
import { IconContext } from "react-icons";
import {
  BsPencilSquare,
  BsFillXSquareFill,
  BsCheckAll,
  BsTrash,
} from "react-icons/bs";
import Button from "../Utils/Button";
import { useFormik } from "formik";
import * as Yup from "yup";

const PeripheralRow = ({
  peripheral,
  edditable = false,
  handleChange = () => {},
  handleDelete = () => {},
}) => {
  const [isEdditable, setIsEdditable] = useState(edditable);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteCconfimation, setShowDeleteCconfimation] = useState(false);

  const peripheralSchema = Yup.object().shape({
    uuid: Yup.string()
      .min(5, "Too Short!")
      .max(50, "Too Long!")
      .required("This field is Required!"),
    vendor: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    dateCreated: Yup.string().required("Required"),
    status: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      uuid: peripheral.uuid,
      vendor: peripheral.vendor,
      dateCreated: peripheral.dateCreated,
      status: peripheral.status,
    },
    validationSchema: peripheralSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      handleChange({...peripheral,...values});
      setIsLoading(false);
      setIsEdditable(false);
    },
  });

  const deleteSchema = Yup.object().shape({
    confirm: Yup.string()
      .min(7, "Too Short!")
      .max(7, "Too Long!")
      .required("This field is Required!"),
  });

  const formikDel = useFormik({
    initialValues: {
      confirmation: "",
    },
    validationSchema: deleteSchema,
    onSubmit: (values) => {
      if (values.confirm === "confirm") 
      {
        setShowDeleteCconfimation(false);
        handleDelete(peripheral);
      }
    },
  });

 

  return isEdditable ? (
    <form onSubmit={formik.handleSubmit}>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Row className={Styles.wrapper}>
          <Col size={1.5} className={Styles.column}>
            <label htmlFor="uuid" className={Styles.label}>
              UUID
            </label>
            <input
              id="uuid"
              name="uuid"
              type="text"
              readOnly={typeof peripheral.toCreate === 'undefined'}
              onChange={formik.handleChange}
              value={formik.values.uuid}
              className={`${Styles.input} ${
                formik.errors.uuid ? Styles.hasError : null
              }`}
            />
            {formik.errors.uuid ? (
              <div className={Styles.InputErrorMessage}>
                {formik.errors.uuid}
              </div>
            ) : null}
          </Col>
          <Col size={1.5} className={Styles.column}>
            <label htmlFor="vendor" className={Styles.label}>
              vendor
            </label>
            <input
              id="vendor"
              name="vendor"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.vendor}
              className={`${Styles.input} ${
                formik.errors.vendor ? Styles.hasError : null
              }`}
            />
            {formik.errors.vendor ? (
              <span className={Styles.InputErrorMessage}>
                {formik.errors.vendor}
              </span>
            ) : null}
          </Col>
          <Col size={1.5} className={Styles.column}>
            <label htmlFor="dateCreated" className={Styles.label}>
              dateCreated
            </label>
            <input
              id="dateCreated"
              name="dateCreated"
              type="dateCreated"
              onChange={formik.handleChange}
              value={formik.values.dateCreated}
              className={`${Styles.input} ${
                formik.errors.dateCreated ? Styles.hasError : null
              }`}
            />
            {formik.errors.dateCreated ? (
              <span className={Styles.InputErrorMessage}>
                {formik.errors.dateCreated}
              </span>
            ) : null}
          </Col>
          <Col size={1.5} className={Styles.column}>
            <label htmlFor="status" className={Styles.label}>
              Status
            </label>
            <input
              id="status"
              name="status"
              type="status"
              onChange={formik.handleChange}
              value={formik.values.status}
              className={`${Styles.input} ${
                formik.errors.status ? Styles.hasError : null
              }`}
            />
            {formik.errors.status ? (
              <span className={Styles.InputErrorMessage}>
                {formik.errors.status}
              </span>
            ) : null}
          </Col>
          <Col size={0.1} className={Styles.column}>
            <IconContext.Provider value={{ size: "1.3em" }}>
              <div className={Styles.btnWrapper}>
                <Button
                  title="Salvar"
                  type="submit"
                  color="black"
                  border="none"
                  margin="0"
                  onClick={() => setIsEdditable(true)}
                  disabled={Object.keys(formik.errors).length > 0}
                >
                  <BsCheckAll />
                </Button>
                <Button
                  title="delete"
                  color="black"
                  type="button"
                  border="none"
                  margin="0"
                  onClick={() => setIsEdditable(false)}
                >
                  <BsTrash />
                </Button>
              </div>
            </IconContext.Provider>
          </Col>
        </Row>
      )}
    </form>
  ) : (
    <>
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
              <Button
                title="edit"
                color="black"
                border="none"
                margin="0"
                onClick={() => setIsEdditable(true)}
              >
                <BsPencilSquare />
              </Button>
              <Button
                title="delete"
                color="black"
                border="none"
                margin="0"
                onClick={() => setShowDeleteCconfimation(true)}
              >
                <BsFillXSquareFill />
              </Button>
            </div>
          </IconContext.Provider>
        </Col>
      </Row>
      {showDeleteCconfimation && (
        <form onSubmit={formikDel.handleSubmit}>
          <Row className={Styles.wrapperDelete}>
            <Col size={1.5} className={Styles.column}>
              <label htmlFor="confirm" className={Styles.labelDelete}>
                Are you sure to DELETE this peripheral? please type `confirm`
              </label>
              <input
                id="confirm"
                name="confirm"
                placeholder="confirm"
                type="text"
                onChange={formikDel.handleChange}
                value={formikDel.values.confirm}
                className={`${Styles.input} ${
                  formikDel.errors.confirm ? Styles.hasError : null
                }`}
              />
              {formikDel.errors.confirm ? (
                <div className={Styles.InputErrorMessage}>
                  {formikDel.errors.confirm}
                </div>
              ) : null}
            </Col>
            <Col size={0.5} className={Styles.column}>
              <IconContext.Provider value={{ size: "1.3em" }}>
                <div className={Styles.btnWrapper}>
                  <Button
                    title="Salvar"
                    type="submit"
                    color="black"
                    border="none"
                    margin="0"
                    disabled={
                      Object.keys(formikDel.errors).length > 0 ||
                      formikDel.values.confirm !== "confirm"
                    }
                  >
                    <BsCheckAll />
                  </Button>
                  <Button
                    title="delete"
                    color="black"
                    type="button"
                    border="none"
                    margin="0"
                    onClick={() => setShowDeleteCconfimation(false)}
                  >
                    <BsTrash />
                  </Button>
                </div>
              </IconContext.Provider>
            </Col>
          </Row>
        </form>
      )}
    </>
  );
};

export default PeripheralRow;
