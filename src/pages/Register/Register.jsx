import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

function Register({ setActiveBtn }) {
  setActiveBtn(1);
  return (
    <>
      <Container className="mt-3">
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={3} lg={4} xs={5}>
            <Card className="shadow p-3">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h4 className="fw-bold mb-2 text-uppercase ">Brand</h4>
                  <br />
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label className="text-center">Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicLastName"
                      >
                        <Form.Label className="text-center">
                          Last Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter last name"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicDepartment"
                      >
                        <Form.Label className="text-center">
                          Department
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter department"
                        />
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
