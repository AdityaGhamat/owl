import axios from "axios";
import serverConfig from "../config/server-config.js";
import NotFoundException from "../errors/notAuthorizedException.js";
import authRepository from "../repository/auth-repository.js";
import IAuth from "../types/database/index.js";
import { userCover } from "../lib/response_covers.js";
import officeServices from "./office-services.js";
class AdminServices {
  private coverMembers(members: IAuth[]) {
    const coveredMembers = members.map((member) => userCover(member));
    return coveredMembers;
  }
  async findMembers(office_id: string) {
    const co_ordinates = await officeServices.co_ordinatesOfOffice(office_id);
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
    return this.coverMembers(members);
  }
}

export default new AdminServices();
