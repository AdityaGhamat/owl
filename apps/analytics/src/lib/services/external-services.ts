import axios from "axios";
import { members } from "../../types/services.js";
import serverConfig from "../../config/server-config.js";
import { HTTPException } from "hono/http-exception";
class AsyncServer {
  async getPresentMembers(office_id: string, members: members) {
    try {
      const response = await axios.post<{ data: members }>(
        `${serverConfig.ATTENDANCE_SERVICE}/api/v1/attendance/present-members?office_id=${office_id}`,
        members
      );
      console.log(response.data);
      const presentMembers = response.data?.data;
      console.log("present members are presented from here", presentMembers);
      return presentMembers;
    } catch (error: any) {
      throw new HTTPException(error.status, { message: error.message });
    }
  }
}

export default new AsyncServer();
