import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { NewBusiness } from "../../domain/models/NewBusiness";
import { ApiResponse } from "../models/ApiResponse";
import { Business } from "../../domain/models/Business";
import { CollectionType } from "./BusinessDataSourceImpl";

export interface BusinessDataSource {
  getAllDocuments(
    collectionType: CollectionType
  ): Promise<ApiResponse<QuerySnapshot<DocumentData, DocumentData>>>;
  getDocumentById(
    collectionType: CollectionType,
    documentId: string
  ): Promise<ApiResponse<Business>>;
  addDocument(
    collectionType: CollectionType,
    document: NewBusiness
  ): Promise<ApiResponse<boolean>>;
  deleteDocument(
    collectionType: CollectionType,
    documentId: string
  ): Promise<ApiResponse<boolean>>;
  updateDocument(
    collectionType: CollectionType,
    documentId: string,
    document: NewBusiness
  ): Promise<ApiResponse<boolean>>;
}
