import React, { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { fetchUpdateEmployee, fetchUpdateEmployeeRemainingDayOff } from "../../api/api";
import { useFormik } from "formik";
import validations from "../../pages/Register/Validation";
import Swal from "sweetalert2";

function EditEmployeeModal({ employee, control, setControl }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
        useFormik({
            initialValues: {
                employeeId:employee && parseInt(employee.id),
                name: employee && employee.name,
                lastName: employee && employee.lastName,
                email: employee && employee.email,
                department: employee && employee.department,
                dayOff: employee && employee.dayOff,
            },
            onSubmit: async (values, bag) => {
                try {

                  //  alert(JSON.stringify(values, null, 2));
                    await fetchUpdateEmployee(values)
                        .then((res) => {
                            setControl(!control);
                            Swal.fire({
                                icon: 'success',
                                title: 'Employee has been updated',
                                showConfirmButton: false,
                                timer: 1100
                            })
                        })
                        .catch((err) => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Employee update error',
                                showConfirmButton: false,
                                timer: 1100
                            })
                            bag.resetForm();
                        });
                } catch (err) {
                    alert(err.response.statusText);
                    console.log(err);
                }
            },
            validationSchema: validations,
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
                                defaultValue={employee && employee.name}
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
                                defaultValue={employee && employee.lastName}
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
                                defaultValue={employee && employee.email}
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
                                defaultValue={employee && employee.department}
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
                        <hr />
                        <div style={{ display: 'flex', justifyContent: 'right' }} >
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
