import axios from "axios";
import serverConfig from "../config/server-config.js";
import NotFoundException from "../errors/notAuthorizedException.js";
import authRepository from "../repository/auth-repository.js";

class AdminServices {
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
  async findMembers(office_id: string) {
    const co_ordinates = await this.co_ordinatesOfOffice(office_id);
    const radiusInMeters = 130;
    const radiusInRadians = radiusInMeters / 6371000;
    const members = await authRepository.find({
      location: {
        $geoWithin: {
          $centerSphere: [co_ordinates, radiusInRadians],
        },
      },
    });
    console.log(members);
    if (!members) {
      throw new NotFoundException("Members not found");
    }
    return members;
  }
}

export default new AdminServices();
