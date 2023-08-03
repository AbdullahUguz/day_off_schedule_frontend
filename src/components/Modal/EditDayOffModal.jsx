import React, { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { fetchUpdateEmployeeRemainingDayOff } from "../../api/api";
import { useFormik } from "formik";
import validations from "./Validation";

function EditDayOffModal({ employee, control, setControl }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        usedDayOff: "",
      },
      onSubmit: async (values, bag) => {
        try {
          await fetchUpdateEmployeeRemainingDayOff({
            employeeId: employee.id,
            usedDayOff: values.usedDayOff,
          })
            .then((res) => {
              setControl(!control);
            })
            .catch((err) => {
              alert(err.response.statusText);
              bag.resetForm();
            });
        } catch (err) {
          alert(err.response.statusText);
          console.log(err);
        }
      },
      validationSchema: validations(employee),
    });

  return (
    <>
      <Button variant="info" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Number of Days off to Be Used</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <h4 className="mb-4">
                For {employee.name} {employee.lastName}
              </h4>
              <Form.Control
                type="number"
                placeholder="Enter Count"
                name="usedDayOff"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.usedDayOff}
                isInvalid={touched.usedDayOff && errors.usedDayOff}
                autoFocus
              />
              {errors.usedDayOff ? (
                <Alert variant="warning p-0 mt-2 px-2">
                  {errors.usedDayOff}
                </Alert>
              ) : (
                <></>
              )}
            </Form.Group>
            <hr />
            <div style={{ display: 'flex', justifyContent: 'right' }}>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              {values.usedDayOff && !(errors.usedDayOff) ? (<Button
                variant="primary"
                className="mx-2"
                type="submit"
                onClick={handleClose}
              >
                Save Changes
              </Button>) : (<Button
                variant="primary"
                className="mx-2"
                type="submit"
                onClick={handleClose}
                disabled
              >
                Save Changes
              </Button>)}

            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditDayOffModal;
