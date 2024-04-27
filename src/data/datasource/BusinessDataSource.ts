import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { NewBusiness } from "../../domain/models/NewBusiness";
import { ApiResponse } from "../models/ApiResponse";
import { Business } from "../../domain/models/Business";

export interface BusinessDataSource {
  getAllBusinesses(): Promise<
    ApiResponse<QuerySnapshot<DocumentData, DocumentData>>
  >;
  addBusiness(business: NewBusiness): Promise<ApiResponse<boolean>>;
  deleteBusiness(businessId: string): Promise<ApiResponse<boolean>>;
  updateBusiness(business: Business): Promise<ApiResponse<boolean>>;
}
