import {
  BusinessRepository,
  CollectionType,
} from "../repository/BusinessRepository";
import { Business } from "../models/Business";
import { Success } from "../models/Result";

export async function getBusinessById(
  repository: BusinessRepository,
  collectionType: CollectionType,
  businessId: string
): Promise<Business | null> {
  const result = await repository.getDocumentById(collectionType, businessId);
  if (result instanceof Success) {
    return result.value;
  } else {
    return null;
  }
}
