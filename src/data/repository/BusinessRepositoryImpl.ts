import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Business, NewBusiness, Result } from "../../domain/models";
import { Success, Failure } from "../../domain/models/Result";
import { BusinessRepository } from "../../domain/repository/BusinessRepository";
import { BusinessDataSource } from "../datasource/BusinessDataSource";
import { ResponseSuccess } from "../models/ApiResponse";

export class BusinessRepositoryImpl implements BusinessRepository {
  dataSource: BusinessDataSource;
  constructor(dataSource: BusinessDataSource) {
    this.dataSource = dataSource;
  }

  async getAllBusinesses(): Promise<Result<Business[]>> {
    const businesses: Business[] = [];
    const businessesResponse = await this.dataSource.getAllBusinesses();
    if (businessesResponse instanceof ResponseSuccess) {
      const snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>[] =
        businessesResponse.value;
      snapshot.forEach((doc) => {
        const businessData = doc.data();
        const business: Business = {
          id: doc.id,
          name: businessData.name,
          street: businessData.street,
          city: businessData.city,
          website: businessData.website,
          reviews: businessData.reviews,
          score: businessData.score,
          phone: businessData.phone,
          category: businessData.category,
          urlMap: businessData.urlMap,
          notes: businessData.notes,
          contacted: businessData.contacted,
        };
        businesses.push(business);
      });
      return new Success(businesses);
    } else {
      const error: string = (businessesResponse as Failure<string>).error;
      return new Response(error);
    }
  }

  async addBusinesses(businesses: NewBusiness[]): Promise<Result<boolean>> {
    try {
      const promises: Promise<Result<boolean>>[] = [];
      for (const business of businesses) {
        promises.push(
          new Promise<Result<boolean>>(async (resolve, reject) => {
            try {
              const businessResponse = await this.dataSource.addBusiness(
                business
              );
              if (businessResponse instanceof ResponseSuccess) {
                resolve(new Success(true));
              } else {
                const error: string = (businessResponse as Failure<string>)
                  .error;
                reject(
                  new Failure(
                    `Failed to add business: ${error}. Business: ${JSON.stringify(
                      business
                    )}`
                  )
                );
              }
            } catch (error) {
              reject(
                new Failure(
                  `Failed to add business: ${error}. Business: ${JSON.stringify(
                    business
                  )}`
                )
              );
            }
          })
        );
      }

      await Promise.all(promises);
      return new Success(true);
    } catch (error) {
      return new Failure(error);
    }
  }

  async deleteBusiness(businessId: string): Promise<Result<boolean>> {
    const deleteResponse = await this.dataSource.deleteBusiness(businessId);
    if (deleteResponse instanceof ResponseSuccess) {
      return new Success(true);
    } else {
      const error: string = (deleteResponse as Failure<string>).error;
      return new Failure(error);
    }
  }

  async updateBusiness(
    businessId: string,
    business: NewBusiness
  ): Promise<Result<boolean>> {
    const updateResponse = await this.dataSource.updateBusiness(
      businessId,
      business
    );
    if (updateResponse instanceof ResponseSuccess) {
      return new Success(true);
    } else {
      const error: string = (updateResponse as Failure<string>).error;
      return new Failure(error);
    }
  }
}
