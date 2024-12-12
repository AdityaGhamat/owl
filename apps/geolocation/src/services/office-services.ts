import serverConfig from "../config/server-config.js";
import axios from "axios";
import { HTTPException } from "hono/http-exception";
import { StatusCodes } from "http-status-codes";

class OfficeServices {
  public async co_ordinatesOfOffice(office_id: string) {
    const response: any = await axios.get(
      `${serverConfig.OFFICE_SERVICE}/api/v1/office?id=${office_id}`
    );
    console.log(response);
    if (response.status != 200) {
      throw new HTTPException(StatusCodes.NOT_FOUND, {
        message: "office not found",
      });
    }
    return response.data?.data?.location?.coordinates;
  }
}
export default new OfficeServices();
