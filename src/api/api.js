import axios from "axios";

export const fetchRegister = async (input) => {
  const { data } = await axios.post(`http://localhost:8080/employees/add`, input);
  return data;
};

export const fetchGetAllEmployee = async (input) => {
  const { data } = await axios.get(`http://localhost:8080/employees/getAll`);
  return data;
};

export const fetchEditEmployeeRemainingDayOff = async (input) => {
  const { data } = await axios.put(`http://localhost:8080/employees/remainingDayOff/${input.employeeId}`,{
    usedDayOff:input.usedDayOff
  });
  return data;
};

export const fetchEmailControl = async (input) => {
  const { data } = await axios.post(`http://localhost:8080/employees/isEmailExist`,input);
  return data;
};

export const fetchUpdateEmployee = async (input) => {
  const { data } = await axios.put(`http://localhost:8080/employees/update/${input.employeeId}`,input);
  return data;
};

export const fetchDeleteEmployee = async (input) => {
  const { data } = await axios.delete(`http://localhost:8080/employees/delete/${input.employeeId}`);
  return data;
};


export const fetchResetRemainingDayOff = async (input) => {
  const { data } = await axios.post(`http://localhost:8080/employees/resetRemainingDayOff/${input.employeeId}`);
  return data;
};
