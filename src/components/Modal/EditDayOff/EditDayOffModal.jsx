import React, { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { fetchResetRemainingDayOff, fetchAddDayOffDetail } from "../../../api/api";
import { useFormik } from "formik";
import validations from "./ValidationEditDayOff";
import Swal from "sweetalert2";


function EditDayOffModal({ dayOff, control, setControl }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [validationControl, setValidationControl] = useState(false);

  const startTimes = [{ time: "08:00" }, { time: "13:00" }];

  const endTimes = [{ time: "13:00" }, { time: "18:00" }];


  const calculateUsedDayOff = (input) => {
    const start = new Date(input.startDate);
    const end = new Date(input.endDate);
    let count = 0;

    if (input.startDate !== input.endDate) {
      if (input.startTime === "08:00" && input.endTime === "13:00") {
        count = 1.5;
        start.setDate(start.getDate() + 1);
        end.setDate(end.getDate() - 1);
      } else if (input.startTime === "13:00" && input.endTime === "18:00") {
        count = 1.5;
        start.setDate(start.getDate() + 1);
        end.setDate(end.getDate() - 1);
      }
    } else {
      if (input.startTime === "08:00" && input.endTime === "13:00") {
        count = 0.5;
        start.setDate(start.getDate() + 1);
      } else if (input.startTime === "13:00" && input.endTime === "18:00") {
        count = 0.5;
        start.setDate(start.getDate() + 1);
      }
    }
    for (let currentDate = start; currentDate <= end; currentDate.setDate(currentDate.getDate() + 1)) {
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        count++;
      }
    }
    input.usedDayOff = count;
    return count;
  }

  const addDayOffDetail = async (input, bag) => {
    await fetchAddDayOffDetail({
      dayOffId: dayOff.id,
      dayOffDetail: input,
    })
      .then((res) => {
        setControl(!control);
        handleClose();
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

  const handleResetReaminingDayOff = () => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, reset it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await fetchResetRemainingDayOff({ dayOffId: dayOff.id })
            .then(res => {
              setControl(!control);
              handleClose();
            }).catch(err => {
              Swal.fire({
                icon: 'error',
                title: 'There is a problem',
                showConfirmButton: false,
                timer: 1100
              })
              console.log("delete: ", err)
            })
          Swal.fire(
            'Reset!',
            'Reamining day off has been reseted.',
            'success'
          )
        }
      })
    } catch (error) {

    }
  }

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        usedDayOff: "",
        startTime: "",
        endTime: "",
        explanation: ""
      },
      onSubmit: async (values, bag) => {
        try {
          console.log("values : ", values)
          await addDayOffDetail(values, bag)
        } catch (err) {
          alert(err.response.statusText);
          console.log(err);
        }
      },
      validationSchema: validations(dayOff),
    });

  return (
    <>
      <div className="mb-2" >
        <div style={{ display: "flex", justifyContent: "left" }} className="mt-3">
          <Button variant="warning" onClick={handleResetReaminingDayOff}>
            Remaining Day Off Reset
          </Button>
        </div>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <Button variant="info" onClick={handleShow} >
            Edit
          </Button>
        </div>
      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Number of Days off to Be Used</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="text-bold">Start Date:</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.startDate}
                isInvalid={validationControl && touched.startDate && errors.startDate}
                autoFocus
                min={new Date().toISOString().split('T')[0]}
              />
              {
                values.startDate ? (
                  <Form.Select
                    aria-label="Default select example"
                    name='startTime'
                    onChange={handleChange}
                    defaultValue={values.startTime}
                  >
                    <option value={0}>Select start time</option>
                    {startTimes ? startTimes.map(startT => (
                      <option value={startT.time}>{startT.time}</option>
                    )) : <></>
                    }
                  </Form.Select>
                ) : <></>
              }
              {validationControl && errors.startDate ? (
                <Alert variant="warning p-0 mt-1 px-2">
                  {errors.startDate}
                </Alert>
              ) : (
                <></>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-bold">End Date:</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={values.endDate}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={validationControl && touched.endDate && errors.endDate}
                autoFocus
                min={new Date().toISOString().split('T')[0]}
              />
              {
                values.endDate ? (
                  <Form.Select
                    aria-label="Default select example"
                    name='endTime'
                    defaultValue={values.endTime}
                    onChange={handleChange}
                  >
                    <option value={0}>Select Part Of Day</option>
                    {endTimes ? endTimes.map(endT => (
                      <option value={endT.time}>{endT.time}</option>
                    )) : <></>
                    }

                  </Form.Select>
                ) : <></>
              }
              {validationControl && errors.endDate ? (
                <Alert variant="warning p-0 mt-1 px-2">
                  {errors.endDate}
                </Alert>
              ) : (
                <></>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-bold">Used Day Off:</Form.Label>
              <Form.Control
                type="number"
                name="usedDayOff"
                onChange={handleChange}
                onBlur={handleBlur}
                value={calculateUsedDayOff(values)}
                isInvalid={validationControl && touched.usedDayOff && errors.usedDayOff}
                autoFocus
                disabled
              />
              {validationControl && errors.usedDayOff ? (
                <Alert variant="warning p-0 mt-1 px-2">
                  {errors.usedDayOff}
                </Alert>
              ) : (
                <></>
              )}
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
                isInvalid={validationControl && touched.explanation && errors.explanation}
                autoFocus
              />
              {validationControl && errors.explanation ? (
                <Alert variant="warning p-0 mt-1 px-2">
                  {errors.explanation}
                </Alert>
              ) : (
                <></>
              )}
            </Form.Group>
            <hr />

            <div style={{ display: 'flex', justifyContent: 'right' }}>
              {new Date(values.startDate) <= new Date(values.endDate) ? (
                <>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    className="mx-2"
                    type="submit"
                    onClick={() => setValidationControl(true)}
                  >
                    Save Changes
                  </Button></>
              ) : (<>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Alert variant="warning p-0 mt-1" style={{ flex: '1' }}>
                    Start date cannot be greater than end date
                  </Alert>
                  <div>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="primary"
                      className="mx-2"
                      type="submit"
                      onClick={() => setValidationControl(true)}
                      disabled
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              </>
              )}

              {/* <Button
                variant="primary"
                className="mx-2"
                type="submit"
                onClick={() => setValidationControl(true)}
              >
                Save Changes
              </Button> */}

            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditDayOffModal;
