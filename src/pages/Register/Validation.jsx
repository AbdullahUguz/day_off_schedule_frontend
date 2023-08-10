import {object,string,number} from "yup";

let employeeSchema =object({
    name: string().required("This field cannot be left blank"),
    lastName: string().required("This field cannot be left blank"),
    email: string().email("Enter a valid email").required("This field cannot be left blank"),
    departmentId:number().required("This field cannot be left blank").min(1,"Please select option"),
})

export default employeeSchema;
