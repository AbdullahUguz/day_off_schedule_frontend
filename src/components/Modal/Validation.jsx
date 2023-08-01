import { object, number } from "yup";

let userSchema = (employee) =>
  object({
    usedDayOff: number()
      .required("0 and negative cannot be entered")
      .positive()
      .integer()
      .min(1,"used day off must be greater than or equal to 1")
      .max(employee.remainingDayOff,"Cannot be greater than the remaining day off"),
  });

export default userSchema;
