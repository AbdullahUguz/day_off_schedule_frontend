import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { fetchCreateDepartment } from '../../../api/api'
import Swal from 'sweetalert2';
import validations from '../AddDepartment/DepartmentValidation'

function AddDepartmentModal({ control, setControl }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
        useFormik({
            initialValues: {
                name: "",
            },
            onSubmit: async (values, bag) => {
                try {
                    await fetchCreateDepartment(values).then((res) => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Department added',
                            showConfirmButton: false,
                            timer: 1100
                        }).then(() => {
                            setControl(!control)
                        })
                        bag.resetForm();
                    }).catch((err) => {
                        if (err.response.status == 409) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'warning',
                                title: 'Department already exist',
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
                    })
                } catch (err) {
                    alert(err.response.statusText);
                    console.log(err);
                }
            },
                validationSchema: validations,
        });

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Department
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Department</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-bold">Name:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                isInvalid={touched.name && errors.name}
                                autoFocus
                            />
                            {errors.name ? (
                                <Alert variant="warning p-0 mt-2 px-2">
                                    {errors.name}
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
                            {values.name && !(errors.name) ? (<Button
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

export default AddDepartmentModal
