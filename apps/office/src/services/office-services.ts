import officeRepository from "../repository/officeRepository.js";
import { IOffice } from "../types/database/index.js";

class OfficeServices {
  async createOffice(data: Partial<IOffice>) {
    const office = await officeRepository.create(data);
    return office;
  }
  async findOfficeById(id: string) {
    const office = await officeRepository.findById(id);
    return office;
  }
  async findOffices(args: any) {
    const offices = await officeRepository.find(args);
    return offices;
  }
  async findOfficeBasedOnField(args: any) {
    const office = await officeRepository.findOne(args);
    console.log(office);
    return office;
  }
  async findByIdAndUpdateOffice(id: string, data: Partial<IOffice>) {
    const office = await officeRepository.findByIdAndUpdate(id, data, {
      new: true,
    });
    return office;
  }
  async findByIdAndDeleteOffice(id: string) {
    const office = await officeRepository.findByIdAndDelete(id);
    if (!office) {
      return false;
    }
    return true;
  }
}

export default new OfficeServices();
