import { CollectionType } from "../../data/datasource/BusinessDataSourceImpl";
import { Success } from "../models/Result";
import { BusinessRepository } from "../repository/BusinessRepository";

export async function deleteBusiness(
  repository: BusinessRepository,
  collectionType: CollectionType,
  businessId: string
): Promise<boolean> {
  const result = await repository.deleteDocument(collectionType, businessId);
  if (result instanceof Success) {
    return result.value;
  } else {
    return false;
  }
}
