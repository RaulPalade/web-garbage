import { Result } from "../models/Result";
import { Business } from "../models/Business";
import { NewBusiness } from "../models/NewBusiness";

export interface BusinessRepository {
  addBusinesses(businesses: NewBusiness[]): Promise<Result<boolean>>;
  deleteBusiness(businessId: string): Promise<Result<boolean>>;
  updateBusiness(business: Business): Promise<Result<boolean>>;
  getAllBusinesses(): Promise<Result<Business[]>>;
}
