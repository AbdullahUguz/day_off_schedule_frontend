import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import validations from "./Validation";
import { useFormik } from "formik";
import { fetchRegister, fetchGetAllDepartment } from "../../api/api";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function Register({ setActiveBtn }) {
  setActiveBtn(1);
  const navigate = useNavigate();
  const [validationControl, setValidationControl] = useState(false);
  const [departments, setDepartmnets] = useState();

  useEffect(() => {
    getAllDepartment();
  }, [])

  const getAllDepartment = async () => {
    try {
      await fetchGetAllDepartment().then((res) => {
        setDepartmnets(res);
      }).catch((err) => {
        console.log(err)
      })
    } catch (error) {
      console.log(error);
    }
  }

  const registerEmployee = async (input, bag) => {
    await fetchRegister({
      employee: {
        name: input.name,
        lastName: input.lastName,
        email: input.email,
      },
      departmentId: input.departmentId
    })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Employee has been registered',
          showConfirmButton: false,
          timer: 1100
        }).then(() => {
          navigate("/employees");
        })
      })
      .catch((err) => {
        if (err.response.status === 409) {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Email already exist',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'There is a problem',
            showConfirmButton: false,
            timer: 1500
          })
        }
        bag.resetForm();
      });
  }

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        lastName: "",
        email: "",
        departmentId: "",
      },
      onSubmit: async (values, bag) => {
        try {
          await registerEmployee(values);
        } catch (err) {
          alert(err.response.statusText);
          console.log(err);
        }
      },
      validationSchema: validations,
    });

  return (
    <>
      <Container className="mt-3">
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={3} lg={4} xs={5}>
            <Card className="shadow p-3">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h4 className="fw-bold mb-2  text-center">Days Off Schedule</h4>
                  <br />
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label className="text-bold">Name:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Name"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          isInvalid={validationControl && touched.name && errors.name}
                        />
                        {validationControl && errors.name ? (
                          <Alert variant="warning p-0 mt-1 px-2">
                            {errors.name}
                          </Alert>
                        ) : (
                          <></>
                        )}
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicLastName"
                      >
                        <Form.Label className="text-center">
                          Last Name:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Last Name"
                          name="lastName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.lastName}
                          isInvalid={validationControl && touched.lastName && errors.lastName}
                        />
                        {validationControl && errors.lastName ? (
                          <Alert variant="warning p-0 mt-1 px-2">
                            {errors.lastName}
                          </Alert>
                        ) : (
                          <></>
                        )}
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">Email:</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter Email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          isInvalid={validationControl && touched.email && errors.email}
                        />
                        {validationControl && errors.email ? (
                          <Alert variant="warning p-0 mt-1 px-2">
                            {errors.email}
                          </Alert>
                        ) : (
                          <></>
                        )}
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicDepartmentId"
                      >
                        <Form.Label className="text-center">
                          Department:
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          name='departmentId'
                          id='departmentId'
                          onChange={handleChange}
                        >
                          <option value={0}>Select Department</option>

                          {departments ? departments.map((department) => (
                            <option value={department.id}>{department.name}</option>
                          )) : <></>}
                        </Form.Select>

                        {validationControl && errors.departmentId ? (
                          <Alert variant="warning p-0 mt-1 px-2">
                            {errors.departmentId}
                          </Alert>
                        ) : (
                          <></>
                        )}
                      </Form.Group>

                      <div className="d-grid mt-4">
                        <Button variant="primary" type="submit" onClick={() => setValidationControl(true)}>
                          Register
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;
