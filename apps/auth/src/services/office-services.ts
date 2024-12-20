import serverConfig from "../config/server-config.js";
import NotFoundException from "../errors/notAuthorizedException.js";

import axios from "axios";
class OfficeServices {
  async co_ordinatesOfOffice(office_id: string) {
    const response: any = await axios.get(
      `${serverConfig.OFFICE_SERVICE}/api/v1/office?id=${office_id}`
    );
    console.log(response);
    if (response.status != 200) {
      throw new NotFoundException("Office not found");
    }
    return response.data?.data?.location?.coordinates;
  }
}

export default new OfficeServices();
