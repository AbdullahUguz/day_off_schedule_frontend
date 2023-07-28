import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { fetchUpdateEmployeeRemainingDayOff } from "../../api/api";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

function ModalComp({ employee }) {
  const navigate = useNavigate();
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
            usedDayOff:values.usedDayOff,
          })
            .then((res) => {
              navigate("/employees");
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
      // validationSchema: validations,
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
                isInvalid={touched.name && errors.name}
                autoFocus
              />
            </Form.Group>
            <div>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" className="mx-2" type="submit" onClick={handleClose}>
                Save Changes
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalComp;
