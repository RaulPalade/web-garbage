import { Business } from "../models";
import { Success } from "../models/Result";
import { BusinessRepository } from "../repository/BusinessRepository";

export async function getAllBusinesses(
  repository: BusinessRepository
): Promise<Business[]> {
  const result = await repository.getAllBusinesses();
  if (result instanceof Success) {
    return result.value;
  } else {
    return [];
  }
}
