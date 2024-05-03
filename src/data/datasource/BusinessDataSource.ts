import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { NewBusiness } from "../../domain/models/NewBusiness";
import { ApiResponse } from "../models/ApiResponse";
import { Business } from "../../domain/models/Business";

export interface BusinessDataSource {
  getAllBusinesses(): Promise<
    ApiResponse<QuerySnapshot<DocumentData, DocumentData>>
  >;
  getBusinessById(businessId: string): Promise<ApiResponse<Business>>;
  addBusiness(business: NewBusiness): Promise<ApiResponse<boolean>>;
  deleteBusiness(businessId: string): Promise<ApiResponse<boolean>>;
  updateBusiness(
    businessId: string,
    business: NewBusiness
  ): Promise<ApiResponse<boolean>>;
}
