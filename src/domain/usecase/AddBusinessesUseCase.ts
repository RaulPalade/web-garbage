import { CollectionType } from "../../data/datasource/BusinessDataSourceImpl";
import { NewBusiness } from "../models";
import { Success } from "../models/Result";
import { BusinessRepository } from "../repository/BusinessRepository";

export async function addBusinesses(
  repository: BusinessRepository,
  collectionType: CollectionType,
  businesses: NewBusiness[]
): Promise<boolean> {
  const result = await repository.addDocuments(collectionType, businesses);
  if (result instanceof Success) {
    return result.value;
  } else {
    return false;
  }
}
