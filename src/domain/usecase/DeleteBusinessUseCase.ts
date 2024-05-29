import { Success } from "../models/Result";
import { BusinessRepository } from "../repository/BusinessRepository";

export async function deleteBusiness(
  repository: BusinessRepository,
  businessId: string
): Promise<boolean> {
  const result = await repository.deleteBusiness(businessId);
  if (result instanceof Success) {
    return result.value;
  } else {
    return false;
  }
}
