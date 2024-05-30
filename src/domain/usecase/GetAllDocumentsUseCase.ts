import { CollectionType } from "../../data/datasource/BusinessDataSourceImpl";
import { Business } from "../models";
import { Success } from "../models/Result";
import { BusinessRepository } from "../repository/BusinessRepository";

export async function getAllDocuments(
  repository: BusinessRepository,
  collectionType: CollectionType
): Promise<Business[]> {
  const result = await repository.getAllDocuments(collectionType);
  if (result instanceof Success) {
    return result.value;
  } else {
    return [];
  }
}
