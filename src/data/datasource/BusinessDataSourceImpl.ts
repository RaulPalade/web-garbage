import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  ApiResponse,
  ResponseFailure,
  ResponseSuccess,
} from "../models/ApiResponse";
import {
  CollectionType,
  collectionMap,
} from "../../domain/repository/BusinessRepository";
import { BusinessDataSource } from "./BusinessDataSource";
import { NewBusiness } from "../../domain/models/NewBusiness";
import { Business } from "../../domain/models/Business";

export class BusinessDataSourceImpl implements BusinessDataSource {
  async getAllDocuments(
    collectionType: CollectionType
  ): Promise<ApiResponse<QuerySnapshot<DocumentData, DocumentData>>> {
    const collectionData = collectionMap[collectionType];

    try {
      if (collectionData.cachedData != null) {
        return new ResponseSuccess(collectionData.cachedData);
      }
      const snapshot = await getDocs(collectionData.ref);
      collectionData.cachedData = snapshot.docs;
      return new ResponseSuccess(snapshot);
    } catch (e) {
      return new ResponseFailure("Something went wrong");
    }
  }

  async getDocumentById(
    collectionType: CollectionType,
    documentId: string
  ): Promise<ApiResponse<Business>> {
    const collectionData = collectionMap[collectionType];

    try {
      const businessDoc = await getDoc(doc(collectionData.ref, documentId));
      if (businessDoc.exists()) {
        const businessData = businessDoc.data();
        return new ResponseSuccess(businessData as Business);
      } else {
        return new ResponseFailure("Business not found");
      }
    } catch (e) {
      console.log(e);
      return new ResponseFailure("Something went wrong");
    }
  }

  async addDocument(
    collectionType: CollectionType,
    document: NewBusiness
  ): Promise<ApiResponse<boolean>> {
    const collectionData = collectionMap[collectionType];

    try {
      const docRef = await addDoc(collectionData.ref, document);

      // Simula un oggetto QueryDocumentSnapshot
      const simulatedDoc: Partial<
        QueryDocumentSnapshot<DocumentData, DocumentData>
      > = {
        id: docRef.id,
        data: () => document,
      };

      // Aggiorna la cache con il nuovo documento aggiunto
      if (collectionData.cachedData) {
        collectionData.cachedData.push(
          simulatedDoc as QueryDocumentSnapshot<DocumentData, DocumentData>
        );
      } else {
        collectionData.cachedData = [
          simulatedDoc as QueryDocumentSnapshot<DocumentData, DocumentData>,
        ];
      }

      return new ResponseSuccess(docRef);
    } catch (e) {
      return new ResponseFailure("Something went wrong");
    }
  }

  async deleteDocument(
    collectionType: CollectionType,
    documentId: string
  ): Promise<ApiResponse<boolean>> {
    const collectionData = collectionMap[collectionType];

    try {
      await deleteDoc(doc(collectionData.ref, documentId));

      if (collectionData.cachedData) {
        collectionData.cachedData = collectionData.cachedData.filter(
          (doc) => doc.id !== documentId
        );
      }

      return new ResponseSuccess(true);
    } catch (error) {
      return new ResponseFailure(
        "Errore durante l'eliminazione del preventivo in attesa"
      );
    }
  }

  async updateDocument(
    collectionType: CollectionType,
    documentId: string,
    document: NewBusiness
  ): Promise<ApiResponse<boolean>> {
    const collectionData = collectionMap[collectionType];

    try {
      const documentRef = doc(collectionData.ref, documentId);
      await updateDoc(documentRef, document);
      const q = query(collectionData.ref, where("__name__", "==", documentId));
      const querySnapshot = await getDocs(q);

      if (collectionData.cachedData) {
        const index = collectionData.cachedData.findIndex(
          (item) => item.id === documentId
        );
        if (index !== -1) {
          collectionData.cachedData[index] = querySnapshot.docs[0];
        } else {
          collectionData.cachedData?.push(...querySnapshot.docs);
        }
      }

      return new ResponseSuccess(true);
    } catch (e) {
      console.log(e);
      return new ResponseFailure("Something went wrong");
    }
  }
}
