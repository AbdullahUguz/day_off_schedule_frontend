import { object, number,string} from "yup";

let employeeSchema = (dayOff) =>
  object({
    usedDayOff: number()
      .required("Field cannot be left blank")
      .positive()
      .max(dayOff.remainingDayOff,"Cannot be greater than the remaining day off"),
      explanation: string().required("Field cannot be left blank"),
      startDate: string().required("Field cannot be left blank"),
      endDate: string().required("Field cannot be left blank"),
  });

export default employeeSchema;
