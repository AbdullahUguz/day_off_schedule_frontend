import axios from "axios";

//--- employees ---

export const fetchRegister = async (input) => {
  const { data } = await axios.post(
    `http://localhost:8080/employees/create`,
    input
  );
  return data;
};

export const fetchGetAllEmployee = async () => {
  const { data } = await axios.get(`http://localhost:8080/employees/getAll`);
  return data;
};

export const fetchUpdateEmployee = async (input) => {
  const { data } = await axios.put(
    `http://localhost:8080/employees/update/${input.employeeId}`,
    input
  );
  return data;
};

//--- day Off ---
export const fetchGetDayOffById = async (input) => {
  const { data } = await axios.get(
    `http://localhost:8080/daysOff/getDayOff/${input.employeeId}`
  );
  return data;
};

export const fetchAddDayOffDetail = async (input) => {
  const { data } = await axios.post(
    `http://localhost:8080/daysOff/addDayOffDetail/${input.dayOffId}`,
    {
      startDate: new Date(input.dayOffDetail.startDate).toISOString().split("T")[0],
      endDate: new Date(input.dayOffDetail.endDate).toISOString().split("T")[0],
      explanation: input.dayOffDetail.explanation,
      usedDayOff: input.dayOffDetail.usedDayOff,
    }
  );
  return data;
};

export const fetchResetRemainingDayOff = async (input) => {
  const { data } = await axios.post(
    `http://localhost:8080/daysOff/resetRemainingDayOff/${input.dayOffId}`
  );
  return data;
};

export const fetchDeleteEmployee = async (input) => {
  const { data } = await axios.delete(
    `http://localhost:8080/employees/delete/${input.employeeId}`
  );
  return data;
};

// export const fetchEditEmployeeRemainingDayOff = async (input) => {
//   const { data } = await axios.put(`http://localhost:8080/employees/remainingDayOff/${input.employeeId}`,{
//     usedDayOff:input.usedDayOff
//   });
//   return data;
// };

// export const fetchEmailControl = async (input) => {
//   const { data } = await axios.post(`http://localhost:8080/employees/isEmailExist`,input);
//   return data;
// };

// --- departments ---
export const fetchGetAllDepartment = async () => {
  const { data } = await axios.get(`http://localhost:8080/departments/getAll`);
  return data;
};

export const fetchCreateDepartment = async (input) => {
  const { data } = await axios.post(
    `http://localhost:8080/departments/create`,
    input
  );
  return data;
};
