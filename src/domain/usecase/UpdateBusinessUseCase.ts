import { CollectionType } from "../../data/datasource/BusinessDataSourceImpl";
import { Business } from "../models/Business";
import { Success } from "../models/Result";
import { BusinessRepository } from "../repository/BusinessRepository";

export async function updateBusiness(
  repository: BusinessRepository,
  collectionType: CollectionType,
  businessId: string,
  business: Business
): Promise<boolean> {
  const result = await repository.updateDocument(
    collectionType,
    businessId,
    business
  );
  if (result instanceof Success) {
    return result.value;
  } else {
    return false;
  }
}
