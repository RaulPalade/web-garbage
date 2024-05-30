import {
  CollectionReference,
  DocumentData,
  QueryDocumentSnapshot,
  collection,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { Result } from "../models/Result";
import { Business } from "../models/Business";
import { NewBusiness } from "../models/NewBusiness";

export enum CollectionType {
  Clients = "clients",
  Businesses = "businesses",
}

export interface CollectionData {
  ref: CollectionReference<DocumentData>;
  cachedData: QueryDocumentSnapshot<DocumentData, DocumentData>[] | null;
}

export const collectionMap: Record<CollectionType, CollectionData> = {
  [CollectionType.Clients]: {
    ref: collection(db, CollectionType.Clients),
    cachedData: null,
  },
  [CollectionType.Businesses]: {
    ref: collection(db, CollectionType.Businesses),
    cachedData: null,
  },
};

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
