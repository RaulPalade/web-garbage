import { Business, NewBusiness, Result } from "../../domain/models";
import { BusinessRepository } from "../../domain/repository/BusinessRepository";
import { BusinessDataSource } from "../datasource/BusinessDataSource";

export class BusinessRepositoryImpl implements BusinessRepository {
  dataSource: BusinessDataSource;
  constructor(dataSource: BusinessDataSource) {
    this.dataSource = dataSource;
  }

  async addBusinesses(businesses: NewBusiness[]): Promise<Result<boolean>> {
    throw new Error("Method not implemented.");
  }

  async deleteBusiness(businessId: string): Promise<Result<boolean>> {
    throw new Error("Method not implemented.");
  }

  async updateBusiness(business: Business): Promise<Result<boolean>> {
    throw new Error("Method not implemented.");
  }

  async getAllBusinesses(): Promise<Result<Business[]>> {
    throw new Error("Method not implemented.");
  }
}
