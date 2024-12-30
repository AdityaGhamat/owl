import serverConfig from "../config/server-config.js";
import axios from "axios";
import { HTTPException } from "hono/http-exception";
import { StatusCodes } from "http-status-codes";
import { location } from "@repo/types/src/database.js";
class OfficeServices {
  public async co_ordinatesOfOffice(office_id: string) {
    const response = await axios.get<{ data: location }>(
      `${serverConfig.OFFICE_SERVICE}/api/v1/office/office-location/${office_id}`
    );

    if (response.status != 200) {
      throw new HTTPException(StatusCodes.NOT_FOUND, {
        message: "office not found",
      });
    }
    const location = response.data?.data;
    return location;
  }
}
export default new OfficeServices();
