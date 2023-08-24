import React, {  useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import {  fetchGetAllDepartment, fetchUpdateEmployee } from "../../../api/api";
import { useFormik } from "formik";
import validations from '../../../pages/Register/Validation';
import Swal from "sweetalert2";

function EditEmployeeModal({ employee, control, setControl }) {
    const [show, setShow] = useState(false);
    const [departments, setDepartments] = useState();
    const handleClose = () => setShow(false);
    const handleShow = async () => {
        await getDepartments()
        setShow(true);
    }

    const updateEmployee = async (input,bag) => {
        await fetchUpdateEmployee({
            employeeId: employee.id,
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
                    title: 'Employee has been updated',
                    showConfirmButton: false,
                    timer: 1100
                }).then(() => {
                    setControl(!control)
                })
            })
            .catch((err) => {
                if (err.response.status == 409) {
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
            });
            bag.resetForm();
    }

    const getDepartments = async () => {
        await fetchGetAllDepartment().then(res => {
            setDepartments(res);
        }).catch((err) => {
            console.log(err)
        })
    }

    const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
        useFormik({
            initialValues: {
                employeeId: employee && parseInt(employee.id),
                name: employee && employee.name,
                lastName: employee && employee.lastName,
                email: employee && employee.email,
                departmentId: employee && employee.department.id,
            },
            onSubmit: async (values,bag) => {
                try {
                    await updateEmployee(values,bag);
                } catch (err) {
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
                            controlId="formBasicDepartmentId"
                        >
                            <Form.Label className="text-center">
                                Department:
                            </Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                name='departmentId'
                                id='departmentId'
                                defaultValue={employee.department && employee.department.id}
                                onChange={handleChange}
                            >
                                <option value={0}>Select Department</option>
                                {departments ? departments.map((department) => (
                                    <option key={department.id} value={department.id}>{department.name}</option>
                                )) : <></>}
                            </Form.Select>

                            {validations && errors.departmentId ? (
                                <Alert variant="warning p-0 mt-1 px-2">
                                    {errors.departmentId}
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
                            {values && !(errors.dayOff || errors.departmentId || errors.email || errors.name || errors.lastName) ? (<Button
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
            </Modal >
        </>
    );
}

export default EditEmployeeModal;
