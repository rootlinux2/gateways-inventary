import React, { useState, useEffect } from "react";
import { Col, Row } from "../Grid";
import Styles from "./index.module.css";
import { IconContext } from "react-icons";
import {
  BsPencilSquare,
  BsFillXSquareFill,
  BsEyeFill,
  BsCheckAll,
  BsTrash,
} from "react-icons/bs";
import Button from "../Utils/Button";
import PeripheralRow from "../PripheralRow";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { toast } from "react-toastify";

function ipv4(message = "Invalid IP address") {
  return this.matches(/(^(\d{1,3}\.){3}(\d{1,3})$)/, {
    message,
    excludeEmptyString: true,
  }).test("ip", message, (value) => {
    return value === undefined || value.trim() === ""
      ? true
      : value.split(".").find((i) => parseInt(i, 10) > 255) === undefined;
  });
}

Yup.addMethod(Yup.string, "ipv4", ipv4);

const GatewaysRow = ({
  gateway,
  edditable = false,
  handleChange = () => {},
  handleDelete = () => {},
}) => {
  const [showPeripherals, setShowPeripherals] = useState(false);
  const [isEdditable, setIsEdditable] = useState(edditable);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteCconfimation, setShowDeleteCconfimation] = useState(false);

  const gatewaySchema = Yup.object().shape({
    serialNumber: Yup.string()
      .min(5, "Too Short!")
      .max(50, "Too Long!")
      .required("This field is Required!"),
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    ipAddress: Yup.string().ipv4().required("Required"),
  });
  const deleteSchema = Yup.object().shape({
    confirm: Yup.string()
      .min(7, "Too Short!")
      .max(7, "Too Long!")
      .required("This field is Required!"),
  });

  const formik = useFormik({
    initialValues: {
      serialNumber: gateway.serialNumber,
      name: gateway.name,
      ipAddress: gateway.ipAddress,
    },
    validationSchema: gatewaySchema,
    onSubmit: (values) => {
      setIsLoading(true);
      Axios.post(`/api/gateways`, { ...gateway, ...values }).then(
        (response) => {
          if (response.data.result === 1) {
            handleChange({ ...gateway, ...values });
          } else {
            toast.error("Something whent wrong!");
          }
          setIsLoading(false);
          setIsEdditable(false);
        }
      );
    },
  });
  const formikDel = useFormik({
    initialValues: {
      confirmation: "",
    },
    validationSchema: deleteSchema,
    onSubmit: (values) => {
      if (values.confirm === "confirm") deleteGateway();
    },
  });

  const deleteGateway = () => {
    setIsLoading(true);
    Axios.delete(`/api/gateways`, { data: { id: gateway._id } }).then((response) => {
      if (response.data.result === 1) {
        handleDelete(gateway);
      } else {
        toast.error("Something whent wrong!");
      }
      setIsLoading(false);
    });
  };

  return isEdditable ? (
    <form onSubmit={formik.handleSubmit}>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Row className={Styles.wrapper}>
          <Col size={1.5} className={Styles.column}>
            <label htmlFor="serialNumber" className={Styles.label}>
              Serial Number
            </label>
            <input
              id="serialNumber"
              name="serialNumber"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.serialNumber}
              className={`${Styles.input} ${
                formik.errors.serialNumber ? Styles.hasError : null
              }`}
            />
            {formik.errors.serialNumber ? (
              <div className={Styles.InputErrorMessage}>
                {formik.errors.serialNumber}
              </div>
            ) : null}
          </Col>
          <Col size={1.5} className={Styles.column}>
            <label htmlFor="name" className={Styles.label}>
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              className={`${Styles.input} ${
                formik.errors.name ? Styles.hasError : null
              }`}
            />
            {formik.errors.name ? (
              <span className={Styles.InputErrorMessage}>
                {formik.errors.name}
              </span>
            ) : null}
          </Col>
          <Col size={1.5} className={Styles.column}>
            <label htmlFor="ipAddress" className={Styles.label}>
              IP Address
            </label>
            <input
              id="ipAddress"
              name="ipAddress"
              type="ipAddress"
              onChange={formik.handleChange}
              value={formik.values.ipAddress}
              className={`${Styles.input} ${
                formik.errors.ipAddress ? Styles.hasError : null
              }`}
            />
            {formik.errors.ipAddress ? (
              <span className={Styles.InputErrorMessage}>
                {formik.errors.ipAddress}
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
                onClick={() => setShowPeripherals(!showPeripherals)}
              >
                <BsEyeFill />
              </Button>
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
                Are you sure to DELETE this gateway? please type `confirm`
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

      {showPeripherals && (
        <Row className={Styles.listWrapper}>
          <ol>
            {gateway.peripheral.length > 0 ? (
              gateway.peripheral.map((p) => (
                <li key={p.uuid}>
                  <PeripheralRow peripheral={p} />
                </li>
              ))
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
