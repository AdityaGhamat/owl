import { ObjectId } from "mongoose";

export interface IOffice {
  _id: ObjectId;
  name: string;
  organizationId: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  contactDetails: {
    phone: string;
    email: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  status: "active" | "inactive" | "pending";
  createdAt?: Date;
  updatedAt?: Date;
}
