import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { NewBusiness } from "../../domain/models/NewBusiness";
import { ApiResponse } from "../models/ApiResponse";

export interface BusinessDataSource {
  getAllBusinesses(): Promise<
    ApiResponse<QuerySnapshot<DocumentData, DocumentData>>
  >;
  addBusiness(business: NewBusiness): Promise<ApiResponse<boolean>>;
  deleteBusiness(businessId: string): Promise<ApiResponse<boolean>>;
  updateBusiness(
    businessId: string,
    business: NewBusiness
  ): Promise<ApiResponse<boolean>>;
}
