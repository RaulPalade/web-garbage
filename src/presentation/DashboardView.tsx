import { AuthRepository } from "../domain/repository/AuthRepository";
import { HeaderComponent } from "./components/HeaderComponent";
import { FooterComponent } from "./components/FooterComponent";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ArrowUpOnSquareIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useBusinessModelController } from "./hooks/useBusinessModelController";
import { BusinessRepository } from "../domain/repository/BusinessRepository";
import { Business, NewBusiness } from "../domain/models";
import { showErrorToast, showSuccessToast } from "../utils/toastUtils";
import { CollectionType } from "../data/datasource/BusinessDataSourceImpl";
import { DesktopTableComponent } from "./components/DesktopTableComponent";
import { MobileTableComponent } from "./components/MobileTabelComponent";
import { useMediaQuery } from "@react-hook/media-query";
import { LoaderView } from "./components/LoaderView";
import jsonLoadAnimation from "../assets/lotties/loadingJson.json";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

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
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const itemsPerPage = 8;
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
          showSuccessToast("File caricato");
          loadBusinesses();
        } else {
          showErrorToast("Errore durante il caricamento del file");
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
        showErrorToast("Errore durante il caricamento del file");
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
        name: item["title"] || "Non disponibile",
        street: item["street"] || "Non disponibile",
        city: item["city"] || "Non disponibile",
        website: item["website"] || "Non disponibile",
        reviews:
          item["reviewsCount"] !== null
            ? item["reviewsCount"] !== 0
              ? item["reviewsCount"]
              : 0
            : "Non disponibile",
        score:
          item["totalScore"] !== null
            ? item["totalScore"] !== 0
              ? item["totalScore"]
              : 0
            : "Non disponibile",
        category: item["categoryName"] || "Non disponibile",
        phone: item["phone"] || "Non disponibile",
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
  const pageRangeDisplayed = 5;

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderPageButtons = () => {
    let startPage = Math.max(
      1,
      currentPage - Math.floor(pageRangeDisplayed / 2)
    );
    let endPage = startPage + pageRangeDisplayed - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - pageRangeDisplayed + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          type="button"
          key={i}
          className={`
  relative inline-flex items-center px-4 py-2 text-sm font-semibold
  ${
    i === currentPage
      ? "bg-palette-primary text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-palette-dark"
      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
  }
`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="w-full min-h-full">
      <HeaderComponent authRepository={authRepository} />
      <main className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between border-b border-gray-200 pb-6 pt-10">
          <p className="text-4xl font-bold tracking-tight text-gray-900">
            Business
          </p>
          <button
            onClick={loadBusinesses}
            className="hidden sm:flex items-center justify-center rounded-md border border-transparent bg-palette-dark hover:bg-palette-light px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:bg-palette-dark focus:ring-offset-2 cursor-pointer"
          >
            <ArrowUpOnSquareIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            Reload
          </button>
          <label className="hidden sm:flex items-center justify-center rounded-md border border-transparent bg-palette-dark hover:bg-palette-light px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:bg-palette-dark focus:ring-offset-2 cursor-pointer">
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

        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            <button
              type="button"
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Da{" "}
                <span className="font-medium">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                a{" "}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, businesses.length)}
                </span>{" "}
                di <span className="font-medium">{businesses.length}</span>{" "}
                risultati
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  type="button"
                  className={classNames(
                    "relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  )}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                {renderPageButtons()}
                <button
                  type="button"
                  className={classNames(
                    "relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  )}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>
      <FooterComponent />
      <LoaderView
        animation={jsonLoadAnimation}
        open={loading}
        onClose={() => console.log("Loading done...")}
      />
    </div>
  );
}
