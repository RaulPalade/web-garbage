import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Business, NewBusiness, Result } from "../../domain/models";
import { Success, Failure } from "../../domain/models/Result";
import { BusinessRepository } from "../../domain/repository/BusinessRepository";
import { BusinessDataSource } from "../datasource/BusinessDataSource";
import { ResponseSuccess } from "../models/ApiResponse";
import { CollectionType } from "../datasource/BusinessDataSourceImpl";

export class BusinessRepositoryImpl implements BusinessRepository {
  dataSource: BusinessDataSource;
  constructor(dataSource: BusinessDataSource) {
    this.dataSource = dataSource;
  }

  async getAllDocuments(
    collectionType: CollectionType
  ): Promise<Result<Business[]>> {
    const documents: Business[] = [];
    const documentsResponse = await this.dataSource.getAllDocuments(
      collectionType
    );

    if (documentsResponse instanceof ResponseSuccess) {
      const snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>[] =
        documentsResponse.value;

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
        documents.push(business);
      });

      // Regex pattern to check for valid URLs
      const urlPattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i" // fragment locator
      );

      // Sort the documents by the website field, placing valid URLs at the top
      documents.sort((a, b) => {
        const aValid = urlPattern.test(a.website);
        const bValid = urlPattern.test(b.website);

        if (aValid && !bValid) {
          return -1;
        } else if (!aValid && bValid) {
          return 1;
        } else {
          return 0;
        }
      });

      return new Success(documents);
    } else {
      const error: string = (documentsResponse as Failure<string>).error;
      return new Response(error);
    }
  }

  async getDocumentById(
    collectionType: CollectionType,
    businessId: string
  ): Promise<Result<Business>> {
    const documentsResponse = await this.dataSource.getDocumentById(
      collectionType,
      businessId
    );
    if (documentsResponse instanceof ResponseSuccess) {
      return new Success(documentsResponse.value);
    } else {
      const error: string = (documentsResponse as Failure<string>).error;
      return new Failure(error);
    }
  }

  async addDocuments(
    collectionType: CollectionType,
    businesses: NewBusiness[]
  ): Promise<Result<boolean>> {
    try {
      const promises: Promise<Result<boolean>>[] = [];
      for (const business of businesses) {
        promises.push(
          new Promise<Result<boolean>>(async (resolve, reject) => {
            try {
              const documentsResponse = await this.dataSource.addDocument(
                collectionType,
                business
              );
              if (documentsResponse instanceof ResponseSuccess) {
                resolve(new Success(true));
              } else {
                const error: string = (documentsResponse as Failure<string>)
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

  async deleteDocument(
    collectionType: CollectionType,
    businessId: string
  ): Promise<Result<boolean>> {
    const deleteResponse = await this.dataSource.deleteDocument(
      collectionType,
      businessId
    );
    if (deleteResponse instanceof ResponseSuccess) {
      return new Success(true);
    } else {
      const error: string = (deleteResponse as Failure<string>).error;
      return new Failure(error);
    }
  }

  async updateDocument(
    collectionType: CollectionType,
    businessId: string,
    business: NewBusiness
  ): Promise<Result<boolean>> {
    const updateResponse = await this.dataSource.updateDocument(
      collectionType,
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
