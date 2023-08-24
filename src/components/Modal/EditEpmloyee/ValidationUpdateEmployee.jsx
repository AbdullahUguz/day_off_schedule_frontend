import {object,string,number} from "yup";

let employeeSchema = (num)=>object({
    name: string().required("This field cannot be left blank"),
    lastName: string().required("This field cannot be left blank"),
    email: string().email("Enter a valid email").required("This field cannot be left blank"),
    department:string().required("This field cannot be left blank"),
})

export default employeeSchema;
