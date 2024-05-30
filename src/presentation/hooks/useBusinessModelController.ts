import {
  BusinessRepository,
  CollectionType,
} from "../../domain/repository/BusinessRepository";
import { addBusinesses } from "../../domain/usecase/AddBusinessesUseCase";
import { deleteBusiness } from "../../domain/usecase/DeleteBusinessUseCase";
import { getAllDocuments } from "../../domain/usecase/GetAllDocumentsUseCase";
import { getBusinessById } from "../../domain/usecase/GetBusinessByIdUseCase";
import { updateBusiness } from "../../domain/usecase/UpdateBusinessUseCase";
import { Business, NewBusiness } from "../../domain/models";

export function useBusinessModelController(repository: BusinessRepository) {
  const handleGetAllDocuments = async (
    collectionType: CollectionType
  ): Promise<Business[]> => {
    return await getAllDocuments(repository, collectionType);
  };

  const handleGetBusinessById = async (
    collectionType: CollectionType,
    businessId: string
  ): Promise<Business | null> => {
    return await getBusinessById(repository, collectionType, businessId);
  };

  const handleAddBusinesses = async (
    collectionType: CollectionType,
    businesses: NewBusiness[]
  ): Promise<boolean> => {
    return await addBusinesses(repository, collectionType, businesses);
  };

  const handleUpdateBusiness = async (
    collectionType: CollectionType,
    businessId: string,
    business: Business
  ): Promise<boolean> => {
    return await updateBusiness(
      repository,
      collectionType,
      businessId,
      business
    );
  };

  const handleDeleteBusiness = async (
    collectionType: CollectionType,
    businessId: string
  ): Promise<boolean> => {
    return await deleteBusiness(repository, collectionType, businessId);
  };

  return {
    handleGetAllDocuments,
    handleGetBusinessById,
    handleAddBusinesses,
    handleUpdateBusiness,
    handleDeleteBusiness,
  };
}
