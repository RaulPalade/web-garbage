import { Result } from "../models/Result";
import { Business } from "../models/Business";
import { NewBusiness } from "../models/NewBusiness";

export interface BusinessRepository {
  getAllBusinesses(): Promise<Result<Business[]>>;
  getBusinessById(businessId: string): Promise<Result<Business>>;
  addBusinesses(businesses: NewBusiness[]): Promise<Result<boolean>>;
  deleteBusiness(businessId: string): Promise<Result<boolean>>;
  updateBusiness(
    businessId: string,
    business: NewBusiness
  ): Promise<Result<boolean>>;
}
