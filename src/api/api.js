import axios from "axios";

export const fetchRegister = async (input) => {
  const { data } = await axios.post(`http://localhost:8080/employees/add`, input);
  return data;
};

export const fetchGetAllEmployee = async (input) => {
  const { data } = await axios.get(`http://localhost:8080/employees/getAll`);
  return data;
};

