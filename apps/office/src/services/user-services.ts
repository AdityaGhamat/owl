import serverConfig from "../config/server-config.js";
import axios from "axios";
import { members } from "@repo/types/src/attendance.js";
class UserServices {
  public async exposeEmployee(employee: [string]): Promise<members> {
    const response = await axios.post<{ data: members }>(
      `${serverConfig.AUTH_SERVICE}/api/v1/user/employees`,
      { employee: employee }
    );
    console.log(response);
    const employees = response.data?.data;
    console.log(employees);
    return employees;
  }
}
export default new UserServices();
