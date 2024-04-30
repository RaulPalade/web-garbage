import { Business, NewBusiness } from "../../domain/models";
import { BusinessRepository } from "../../domain/repository/BusinessRepository";
import { addBusinesses } from "../../domain/usecase/AddBusinessesUseCase";
import { getAllBusinesses } from "../../domain/usecase/GetAllBusinessesUseCase";

export function useBusinessModelController(repository: BusinessRepository) {
  const handleGetAllBusinesses = async (): Promise<Business[]> => {
    return await getAllBusinesses(repository);
  };

  const handleAddBusinesses = async (
    businesses: NewBusiness[]
  ): Promise<boolean> => {
    return await addBusinesses(repository, businesses);
  };

  return { handleGetAllBusinesses, handleAddBusinesses };
}