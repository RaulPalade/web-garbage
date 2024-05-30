import {
  BusinessRepository,
  CollectionType,
} from "../repository/BusinessRepository";
import { Success } from "../models/Result";

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
