import {object,string,number} from "yup";

let userSchema = object({
    name: string().required("This field cannot be left blank"),
    lastName: string().required("This field cannot be left blank"),
    email: string().email("Enter a valid email").required("This field cannot be left blank"),
    department:string().required("This field cannot be left blank"),
    dayOff: number().min(20,"Day off must be min 20 day").max(40,"Day off must be max 40 day").required("This field cannot be left blank")
})

export default userSchema;
