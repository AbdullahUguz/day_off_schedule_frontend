import React, { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { fetchUpdateEmployeeRemainingDayOff } from "../../api/api";
import { useFormik } from "formik";
import validations from "./Validation";

function EditEmployeeModal({ employee, control, setControl }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
        useFormik({
            initialValues: {
                name: "",
                lastName: "",
                email: "",
                department: "",
                dayOff: "",
            },
            onSubmit: async (values, bag) => {
                try {
                    //   await fetchUpdateEmployeeRemainingDayOff({
                    //     employeeId: employee.id,
                    //     usedDayOff: values.usedDayOff,
                    //   })
                    //     .then((res) => {
                    //       setControl(!control);
                    //     })
                    //     .catch((err) => {
                    //       alert(err.response.statusText);
                    //       bag.resetForm();
                    //     });
                } catch (err) {
                    alert(err.response.statusText);
                    console.log(err);
                }
            },
            validationSchema: validations(employee),
        });

    return (
        <>
            <Button variant="warning" onClick={handleShow}>
                Update
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicDayOff"
                        >
                            <Form.Label className="text-center">
                                Day Off:
                            </Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Day Off"
                                name="dayOff"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.dayOff}
                                isInvalid={touched.dayOff && errors.dayOff}
                            />
                            {errors.dayOff ? (
                                <Alert variant="warning p-0 mt-1 px-2">
                                    {errors.dayOff}
                                </Alert>
                            ) : (
                                <></>
                            )}
                        </Form.Group>

                        <div >
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button
                                variant="primary"
                                className="mx-2"
                                type="submit"
                                onClick={handleClose}
                            >
                                Save Changes
                            </Button>

                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EditEmployeeModal;
