import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";
import { AuthRepository } from "../../../domain/repository";
import {
  BusinessRepository,
  CollectionType,
} from "../../../domain/repository/BusinessRepository";
import { useBusinessModelController } from "../../hooks/useBusinessModelController";
import { Business } from "../../../domain/models";
import { DesktopTableComponent } from "../../components/tables/DesktopTableComponent";
import { FooterComponent } from "../../components/headers/FooterComponent";
import { HeaderComponent } from "../../components/headers/HeaderComponent";
import { MobileTableComponent } from "../../components/tables/MobileTabelComponent";
import { PaginationComponent } from "../../components/PaginationComponent";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
