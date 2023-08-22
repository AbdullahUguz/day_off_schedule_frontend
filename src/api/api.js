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
      startDate:  formatDate(input.dayOffDetail.startDate),
      endDate:  formatDate(input.dayOffDetail.endDate),
      explanation: input.dayOffDetail.explanation,
      usedDayOff: input.dayOffDetail.usedDayOff,
    }
  );
  return data;
};

const formatDate = (date) => {
  const formattedDate = new Date(date);
  const year = formattedDate.getFullYear();
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
  const day = formattedDate.getDate().toString().padStart(2, '0');
  const hours = formattedDate.getHours().toString().padStart(2, '0');
  const minutes = formattedDate.getMinutes().toString().padStart(2, '0');

  console.log(`${day}/${month}/${year} ${hours}:${minutes}`)

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

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
