import { useMediaQuery } from "@react-hook/media-query";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CollectionType } from "../../../data/datasource/BusinessDataSourceImpl";
import { Business } from "../../../domain/models";
import { AuthRepository } from "../../../domain/repository";
import { BusinessRepository } from "../../../domain/repository/BusinessRepository";
import { DesktopTableComponent } from "../../components/DesktopTableComponent";
import { FooterComponent } from "../../components/FooterComponent";
import { HeaderComponent } from "../../components/HeaderComponent";
import { MobileTableComponent } from "../../components/MobileTabelComponent";
import { PaginationComponent } from "../../components/PaginationComponent";
import { useBusinessModelController } from "../../hooks/useBusinessModelController";

export function ClientsView({
  authRepository,
  businessRepository,
}: {
  authRepository: AuthRepository;
  businessRepository: BusinessRepository;
}) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const { handleGetAllDocuments } =
    useBusinessModelController(businessRepository);

  useEffect(() => {
    loadBusinesses();
  }, []);

  const loadBusinesses = async () => {
    const businesses = await handleGetAllDocuments(CollectionType.Businesses);
    setBusinesses(businesses);
  };

  const navigateToBusiness = (businessId: string) => {
    navigate(`/clients/${businessId}`, { state: businessId });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBusinesses = businesses.slice(startIndex, endIndex);

  const totalPages = Math.ceil(businesses.length / itemsPerPage);

  return (
    <div className="w-full min-h-full">
      <HeaderComponent authRepository={authRepository} />
      <main className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between border-b border-gray-200 pb-6 pt-10">
          <p className="text-4xl font-bold tracking-tight text-gray-900">
            My Clients
          </p>
        </div>
        {isMobile ? (
          <MobileTableComponent
            businesses={currentBusinesses}
            navigateToBusiness={navigateToBusiness}
          />
        ) : (
          <DesktopTableComponent
            businesses={currentBusinesses}
            navigateToBusiness={navigateToBusiness}
          />
        )}

        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
      <FooterComponent />
    </div>
  );
}
