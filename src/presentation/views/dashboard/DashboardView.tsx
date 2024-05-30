import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";
import { AuthRepository } from "../../../domain/repository/AuthRepository";
import { BusinessRepository } from "../../../domain/repository/BusinessRepository";
import { Business, NewBusiness } from "../../../domain/models";
import { CollectionType } from "../../../data/datasource/BusinessDataSourceImpl";
import { HeaderComponent } from "../../components/headers/HeaderComponent";
import { FooterComponent } from "../../components/headers/FooterComponent";
import { LoaderView } from "../../components/loaders/LoaderView";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import { useBusinessModelController } from "../../hooks/useBusinessModelController";
import { DesktopTableComponent } from "../../components/tables/DesktopTableComponent";
import { MobileTableComponent } from "../../components/tables/MobileTabelComponent";
import { PaginationComponent } from "../../components/PaginationComponent";
import jsonLoadAnimation from "../../../assets/lotties/loadingJson.json";
import onSuccessAnimation from "../../../assets/lotties/success.json";
import onFailureAnimation from "../../../assets/lotties/error.json";

export function DashboardView({
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
  const [loading, setLoading] = useState<boolean>(false);
  const [currentAnimation, setCurrentAnimation] =
    useState<any>(jsonLoadAnimation);
  const [animationMessage, setAnimationMessage] = useState<string>(
    "Caricamento in corso..."
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { handleGetAllDocuments, handleAddBusinesses } =
    useBusinessModelController(businessRepository);

  useEffect(() => {
    loadBusinesses();
  }, []);

  const loadBusinesses = async () => {
    const businesses = await handleGetAllDocuments(CollectionType.Businesses);
    setBusinesses(businesses);
  };

  const navigateToBusiness = (businessId: string) => {
    navigate(`/businesses/${businessId}`, { state: businessId });
  };

  const handleUploadJson = async () => {
    const fileInput = fileInputRef.current;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const content = await readFile(file);
      const dataToAdd = processData(JSON.parse(content));

      try {
        setLoading(true);
        const addResponse = await handleAddBusinesses(
          CollectionType.Businesses,
          dataToAdd
        );
        if (addResponse) {
          setCurrentAnimation(onSuccessAnimation);
          setAnimationMessage("Caricamento completato");
          loadBusinesses();
        } else {
          setCurrentAnimation(onFailureAnimation);
          setAnimationMessage("Errore durante il caricamento");
        }
      } catch (e) {
        setCurrentAnimation(onFailureAnimation);
        setAnimationMessage("Errore durante il caricamento");
      } finally {
        setTimeout(() => {
          setLoading(false);
          setTimeout(() => {
            setCurrentAnimation(jsonLoadAnimation);
            setAnimationMessage("Caricamento in corso...");
          }, 1000);
        }, 2000);
      }
      fileInput.value = "";
    }
  };

  const readFile = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target) {
          resolve(event.target.result as string);
        } else {
          reject(new Error("Error during file reading."));
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsText(file);
    });
  };

  const processData = (jsonData: any) => {
    const dataToAdd: NewBusiness[] = [];

    jsonData.forEach((item: any) => {
      const newBusiness: NewBusiness = {
        name: item["title"] || "Titolo non disponibile",
        street: item["street"] || "Indirizzo non disponibile",
        city: item["city"] || "Città non disponibile",
        website: item["website"] || "Sito web non disponibile",
        reviews:
          item["reviewsCount"] !== null
            ? item["reviewsCount"] !== 0
              ? item["reviewsCount"]
              : 0
            : "Numero recensioni non disponibile",
        score:
          item["totalScore"] !== null
            ? item["totalScore"] !== 0
              ? item["totalScore"]
              : 0
            : "Rating non disponibile",
        category: item["categoryName"] || "Categoria non disponibile",
        phone: item["phone"] || "Telefono non disponibile",
        urlMap: item["url"] || "Non disponibile",
        notes: "",
        contacted: false,
      };
      dataToAdd.push(newBusiness);
    });

    return dataToAdd;
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
            Business
          </p>
          <label className="hidden sm:flex items-center justify-center rounded-md border border-transparent bg-palette-primary hover:bg-palette-dark px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:bg-palette-dark focus:ring-offset-2 cursor-pointer">
            <ArrowUpOnSquareIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleUploadJson}
              accept=".json"
            />
            Upload JSON
          </label>
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
      <LoaderView
        animation={currentAnimation}
        message={animationMessage}
        open={loading}
        onClose={() => console.log("Loading done...")}
      />
    </div>
  );
}
