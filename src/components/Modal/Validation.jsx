import { object, number } from "yup";

let userSchema = (employee) =>
  object({
    usedDayOff: number()
      .required("Field cannot be left blank")
      .positive()
      .integer()
      .min(1,"Used day off must be greater than or equal to 1")
      .max(employee.remainingDayOff,"Cannot be greater than the remaining day off"),
  });

export default userSchema;
