import React, { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { fetchEditEmployeeRemainingDayOff, fetchResetRemainingDayOff } from "../../../api/api";
import { useFormik } from "formik";
import validations from "./ValidationEditDayOff";
import Swal from "sweetalert2";


function EditDayOffModal({ employee, control, setControl }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const calculateEndDate = (input) => {
    if (input.startDate && input.usedDayOff > 0) {
      const start = new Date(input.startDate);
      const end = new Date(start);

      if (input.usedDayOff == 1) {
        end.setDate(start.getDate())
      } else {

        let cntrl = input.usedDayOff;
        let sc = 0;

        let currentDate = new Date(start);

        while (cntrl > 0) {
          if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
            sc++;
          }
          cntrl--;
          currentDate.setDate(currentDate.getDate() + 1);
        }

        console.log("sc: ", sc, " dayIff: ", input.usedDayOff)
        end.setDate(start.getDate() + input.usedDayOff + sc);

      }
      return end.toISOString().split('T')[0];
    }
    return null;
  }

  const editRemainingDayOff = async (input, bag) => {
    await fetchEditEmployeeRemainingDayOff({
      employeeId: employee.id,
      usedDayOff: input.usedDayOff,
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
        alert(err.response.statusText);
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
        endDate: "",
        explanation: ""
      },
      onSubmit: async (values, bag) => {
        try {
          await editRemainingDayOff(values, bag)
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
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-bold">Used Day Off:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Count"
                name="usedDayOff"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.usedDayOff}
                //   isInvalid={touched.usedDayOff && errors.usedDayOff}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-bold">End Date:</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={calculateEndDate(values)}
                onChange={handleChange}
                onBlur={handleBlur}
                //   isInvalid={touched.startDate && errors.startDate}
                autoFocus
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-bold">Explanation:</Form.Label>
              <Form.Control
                as="textarea" rows={3}
                placeholder="Enter Count"
                name="usedDayOff"
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
              {values.usedDayOff && !(errors.usedDayOff) ? (<Button
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

export default EditDayOffModal;
