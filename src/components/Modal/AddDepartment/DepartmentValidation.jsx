import {object,string} from "yup";

let departmentSchema = ()=>object({
    name: string().required("This field cannot be left blank"),
})

export default departmentSchema;
