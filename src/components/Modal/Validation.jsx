import { object, number } from "yup";

let userSchema = (employee) =>
  object({
    usedDayOff: number()
      .required("0 ve negatif girilemez")
      .positive()
      .integer()
      .min(1)
      .max(employee.remainingDayOff,"Kalan izin gününden büyük olamaz"),
  });

export default userSchema;
