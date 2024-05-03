import { Business } from "../models/Business";
import { Success } from "../models/Result";
import { BusinessRepository } from "../repository/BusinessRepository";

export async function getBusinessById(
  repository: BusinessRepository,
  businessId: string
): Promise<Business | null> {
  const result = await repository.getBusinessById(businessId);
  if (result instanceof Success) {
    return result.value;
  } else {
    return null;
  }
}
