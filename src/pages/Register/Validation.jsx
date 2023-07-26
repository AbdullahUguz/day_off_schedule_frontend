import {object,string} from "yup";

let userSchema = object({
    name: string().required("This field cannot be left blank"),
    lastName: string().required("This field cannot be left blank"),
    email: string().email("Enter a valid email").required("This field cannot be left blank"),
    department:string().required("This field cannot be left blank"),
})

export default userSchema;
