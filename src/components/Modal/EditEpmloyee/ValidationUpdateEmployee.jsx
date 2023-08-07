import {object,string,number} from "yup";

let employeeSchema = (num)=>object({
    name: string().required("This field cannot be left blank"),
    lastName: string().required("This field cannot be left blank"),
    email: string().email("Enter a valid email").required("This field cannot be left blank"),
    department:string().required("This field cannot be left blank"),
    dayOff: number().min(num.remainingDayOff>20 ? parseInt(num.remainingDayOff):20 ,`Day off must be min ${num.remainingDayOff>20 ? parseInt(num.remainingDayOff):20} day  ${num.remainingDayOff >12}`).max(40,"Day off must be max 40 day").required("This field cannot be left blank")
})

export default employeeSchema;
