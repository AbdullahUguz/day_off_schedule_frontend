import React from "react";
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
import { fetchRegister, fetchEmailControl } from "../../api/api";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function Register({ setActiveBtn }) {
  setActiveBtn(1);
  const navigate = useNavigate();


  const emailControl = async(input,bag)=>{
    await fetchEmailControl({ email: input.email })
    .then(async (res) => {
      if (res === false) {
       await registerEmployee(input,bag)
      } else if (res === true) {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Email already exist',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }).catch((err) => {
      console.log("Email control error : ", err)
    });
  }

  const registerEmployee = async(input,bag)=>{
    await fetchRegister({
      name: input.name,
      lastName: input.lastName,
      email: input.email,
      department: input.department
    })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Employee has been registered',
          showConfirmButton: false,
          timer: 1100
        }).then(()=>{
           navigate("/employees");
        })
      })
      .catch((err) => {
        alert(err.response.statusText);
        bag.resetForm();
      });
  }

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        lastName: "",
        email: "",
        department: "",
      },
      onSubmit: async (values, bag) => {
        try {
            await emailControl(values,bag) // Register Employee operation inside emailControl()
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
                          isInvalid={touched.name && errors.name}
                        />
                        {errors.name ? (
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
                          isInvalid={touched.lastName && errors.lastName}
                        />
                        {errors.lastName ? (
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
                          isInvalid={touched.email && errors.email}
                        />
                        {errors.email ? (
                          <Alert variant="warning p-0 mt-1 px-2">
                            {errors.email}
                          </Alert>
                        ) : (
                          <></>
                        )}
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicDepartment"
                      >
                        <Form.Label className="text-center">
                          Department:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Department"
                          name="department"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.department}
                          isInvalid={touched.department && errors.department}
                        />
                        {errors.department ? (
                          <Alert variant="warning p-0 mt-1 px-2">
                            {errors.department}
                          </Alert>
                        ) : (
                          <></>
                        )}
                      </Form.Group>

                      <div className="d-grid mt-5">
                        <Button variant="primary" type="submit">
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
