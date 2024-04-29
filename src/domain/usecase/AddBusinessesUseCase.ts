import { NewBusiness } from "../models";
import { Success } from "../models/Result";
import { BusinessRepository } from "../repository/BusinessRepository";

export async function addBusinesses(
  repository: BusinessRepository,
  businesses: NewBusiness[]
): Promise<boolean> {
  const result = await repository.addBusinesses(businesses);
  if (result instanceof Success) {
    return result.value;
  } else {
    return false;
  }
}
