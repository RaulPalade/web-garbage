import { Result } from "../models/Result";
import { Business } from "../models/Business";
import { NewBusiness } from "../models/NewBusiness";
import { CollectionType } from "../../data/datasource/BusinessDataSourceImpl";

export interface BusinessRepository {
  getAllDocuments(collectionType: CollectionType): Promise<Result<Business[]>>;
  getDocumentById(
    collectionType: CollectionType,
    documentId: string
  ): Promise<Result<Business>>;
  addDocuments(
    collectionType: CollectionType,
    documents: NewBusiness[]
  ): Promise<Result<boolean>>;
  deleteDocument(
    collectionType: CollectionType,
    documentId: string
  ): Promise<Result<boolean>>;
  updateDocument(
    collectionType: CollectionType,
    documentId: string,
    document: NewBusiness
  ): Promise<Result<boolean>>;
}
