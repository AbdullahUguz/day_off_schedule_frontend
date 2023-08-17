import React, { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { fetchEditEmployeeRemainingDayOff, fetchAddDayOffDetail } from "../../../api/api";
import { useFormik } from "formik";
import validations from "./ValidationEditDayOff";
import Swal from "sweetalert2";


function EditDayOffModal({ dayOff, control, setControl }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const calculateUsedDayOff = (input) => {
    const start = new Date(input.startDate);
    const end = new Date(input.endDate);
    let count = 0;

    const isStartHalfDay = input.startDayPart === 'Morning' || input.startDayPart === 'Afternoon';
    const isEndHalfDay = input.endDayPart === 'Morning' || input.endDayPart === 'Afternoon';

    if (isStartHalfDay && isEndHalfDay) {
      count = 1;
      start.setDate(start.getDate() + 1);
      end.setDate(end.getDate() - 1);
    } else if (isStartHalfDay) {
      count = 0.5;
      start.setDate(start.getDate() + 1);
    }
    else if (isEndHalfDay) {
      count = .5;
      end.setDate(end.getDate() - 1);
    }

    for (let currentDate = start; currentDate <= end; currentDate.setDate(currentDate.getDate() + 1)) {
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        count++;
      }
    }
    input.usedDayOff=count;
    return count;
  }

  const addDayOffDetail = async (input, bag) => {
    await fetchAddDayOffDetail({
      dayOffId: dayOff.id,
      dayOffDetail:input,
    })
      .then((res) => {
        setControl(!control);
        Swal.fire({
          icon: 'success',
          title: 'Remaining day off edited',
          showConfirmButton: false,
          timer: 1100
        })
      })
      .catch((err) => {
        alert(err);
        bag.resetForm();
      });
  }

  // const handleResetReaminingDayOff = () => {
  //   try {
  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: "You won't be able to revert this!",
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Yes, reset it!'
  //     }).then(async (result) => {
  //       if (result.isConfirmed) {
  //         await fetchResetRemainingDayOff({ employeeId: employee.id })
  //           .then(res => {
  //             setControl(!control);
  //             handleClose();
  //           }).catch(err => {
  //             Swal.fire({
  //               icon: 'error',
  //               title: 'There is a problem',
  //               showConfirmButton: false,
  //               timer: 1100
  //             })
  //             console.log("delete: ", err)
  //           })
  //         Swal.fire(
  //           'Reset!',
  //           'Reamining day off has been reseted.',
  //           'success'
  //         )
  //       }
  //     })
  //   } catch (error) {

  //   }
  // }
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        usedDayOff: "",
        startDate: "",
        startDayPart: "",
        endDate: "",
        endDayPart: "",
        explanation: ""
      },
      onSubmit: async (values, bag) => {
        try {
          console.log("values : ",values)
          await addDayOffDetail(values, bag)
        } catch (err) {
          alert(err.response.statusText);
          console.log(err);
        }
      },
      //    validationSchema: validations(employee),
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
              {/* <div style={{ display: 'flex', justifyContent: 'left' }} className="mb-4">
                <Button variant="info" onClick={handleResetReaminingDayOff}>
                  Remining Day Off Reset
                </Button>
              </div>
              <h4 className="mb-4">
                {/* For {employee.name} {employee.lastName} 
              </h4> */}
              <Form.Label className="text-bold">Start Date:</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.startDate}
                //   isInvalid={touched.startDate && errors.startDate}
                autoFocus
                min={new Date().toISOString().split('T')[0]}
              />
              {
                values.startDate ? (
                  <Form.Select
                    aria-label="Default select example"
                    name='startDayPart'
                    onChange={handleChange}
                  >
                    {/* {
                    values.startDayPart 
                    ? (<option value={values.startDayPart}>{values.startDayPart}</option>) 
                    : (<></>)
                    } */}
                    
                    <option value="All Day">All Day</option>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                  </Form.Select>
                ) : <></>
              }


            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-bold">End Date:</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={values.endDate}
                onChange={handleChange}
                onBlur={handleBlur}
                //   isInvalid={touched.startDate && errors.startDate}
                autoFocus
                min={new Date().toISOString().split('T')[0]}

              />
              {
                values.endDate && (values.startDate != values.endDate) ? (
                  <Form.Select
                    aria-label="Default select example"
                    name='endDayPart'
                    onChange={handleChange}
                  >
                    {
                    values.endDayPart 
                    ? (<option value={values.endDayPart}>{values.endDayPart}</option>) 
                    : (<option value="All Day">All Day</option>)
                    }
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>

                  </Form.Select>
                ) : <></>
              }
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-bold">Used Day Off:</Form.Label>
              <Form.Control
                type="number"
                //    placeholder="Enter Count"
                name="usedDayOff"
                onChange={handleChange}
                onBlur={handleBlur}
                value={calculateUsedDayOff(values)}
                //   isInvalid={touched.usedDayOff && errors.usedDayOff}
                autoFocus
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-bold">Explanation:</Form.Label>
              <Form.Control
                as="textarea" rows={3}
                placeholder="Enter explanation"
                name="explanation"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.explanation}
                //  isInvalid={touched.usedDayOff && errors.usedDayOff}
                autoFocus
              />
            </Form.Group>
            <hr />

            <div style={{ display: 'flex', justifyContent: 'right' }}>
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

export default EditDayOffModal;
