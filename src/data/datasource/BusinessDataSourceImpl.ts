import { NewBusiness } from "../../domain/models/NewBusiness";
import {
  ApiResponse,
  ResponseFailure,
  ResponseSuccess,
} from "../models/ApiResponse";
import { BusinessDataSource } from "./BusinessDataSource";
import { db } from "../../firebase.config";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Business } from "../../domain/models";

export class BusinessDataSourceImpl implements BusinessDataSource {
  businessesRef = collection(db, "businesses");
  cachedBusinesses: QueryDocumentSnapshot<DocumentData, DocumentData>[] | null =
    null;

  async getAllBusinesses(): Promise<
    ApiResponse<QuerySnapshot<DocumentData, DocumentData>>
  > {
    try {
      if (this.cachedBusinesses != null) {
        return new ResponseSuccess(this.cachedBusinesses);
      }
      const businessesSnapshot = await getDocs(this.businessesRef);
      this.cachedBusinesses = businessesSnapshot.docs;
      return new ResponseSuccess(businessesSnapshot);
    } catch (e) {
      return new ResponseFailure("Something went wrong");
    }
  }

  async getBusinessById(businessId: string): Promise<ApiResponse<Business>> {
    try {
      const businessDoc = await getDoc(doc(this.businessesRef, businessId));
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

  async addBusiness(business: NewBusiness): Promise<ApiResponse<boolean>> {
    try {
      const docRef = await addDoc(this.businessesRef, business);
      return new ResponseSuccess(docRef);
    } catch (e) {
      return new ResponseFailure("Something went wrong");
    }
  }

  async deleteBusiness(businessId: string): Promise<ApiResponse<boolean>> {
    try {
      await deleteDoc(doc(this.businessesRef, businessId));
      return new ResponseSuccess(true);
    } catch (error) {
      return new ResponseFailure(
        "Errore durante l'eliminazione del preventivo in attesa"
      );
    }
  }

  async updateBusiness(
    businessId: string,
    business: NewBusiness
  ): Promise<ApiResponse<boolean>> {
    try {
      const documentRef = doc(this.businessesRef, businessId);
      await updateDoc(documentRef, business);
      const q = query(this.businessesRef, where("__name__", "==", businessId));
      const querySnapshot = await getDocs(q);

      if (this.cachedBusinesses) {
        const index = this.cachedBusinesses.findIndex(
          (item) => item.id === businessId
        );
        if (index !== -1) {
          this.cachedBusinesses[index] = querySnapshot.docs[0];
        } else {
          this.cachedBusinesses?.push(...querySnapshot.docs);
        }
      }

      return new ResponseSuccess(true);
    } catch (e) {
      console.log(e);
      return new ResponseFailure("Something went wrong");
    }
  }
}
