import { Business } from "../models/Business";
import { Success } from "../models/Result";
import { BusinessRepository } from "../repository/BusinessRepository";

export async function updateBusiness(
  repository: BusinessRepository,
  businessId: string,
  business: Business
): Promise<boolean> {
  const result = await repository.updateBusiness(businessId, business);
  if (result instanceof Success) {
    return result.value;
  } else {
    return false;
  }
}
