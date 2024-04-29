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
import { toast } from "react-toastify";

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
  const navigate = useNavigate();

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const itemsPerPage = 5;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { handleGetAllBusinesses, handleAddBusinesses } =
    useBusinessModelController(businessRepository);

  useEffect(() => {
    loadBusinesses();
  }, [currentPage]);

  const loadBusinesses = async () => {
    const businesses = await handleGetAllBusinesses();
    console.log(businesses);
    setBusinesses(businesses);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const navigateToBusiness = (business: Business) => {
    navigate(`/dashboard/businesses/${business.id}`, { state: { business } });
  };

  const handleUploadJson = async () => {
    const fileInput = fileInputRef.current;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const content = await readFile(file);

      const dataToAdd = processData(JSON.parse(content));
      console.log(dataToAdd);

      setLoading(true);
      await handleAddBusinesses(dataToAdd);
      //refreshTable();
      fileInput.value = "";
      setLoading(false);
      toast.success("JSON Uploaded");
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
      console.log(item["reviewsCount"] || "Non disponibile");
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
      };
      dataToAdd.push(newBusiness);
    });

    return dataToAdd;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBusinesses = businesses.slice(startIndex, endIndex);

  const removeHttpAndWww = (url: string) => {
    return url.replace(/^(https?:\/\/)?(www\.)?/i, "").replace(/\/$/, "");
  };

  // if (loading) {
  //   return <CircularLoaderComponent />;
  // }

  return (
    <div className="w-full min-h-full">
      <HeaderComponent authRepository={authRepository} />
      <main className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between border-b border-gray-200 pb-6 pt-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Business
          </h1>
          <label className="flex items-center justify-center rounded-md border border-transparent bg-palette-dark hover:bg-palette-light px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:bg-palette-dark focus:ring-offset-2 cursor-pointer">
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
        <ul className="divide-y divide-gray-100">
          {currentBusinesses.map((business) => (
            <li
              key={business.id}
              className="flex justify-between gap-x-6 py-4 px-4 cursor-pointer transition-all duration-300 hover:bg-palette-lighter"
              onClick={() => navigateToBusiness(business)}
            >
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {business.name}
                  </p>
                  <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                    {business.category}
                  </span>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  {business.street}, {business.city}
                </p>
                <span
                  className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                    business.website === "Non disponibile"
                      ? "bg-red-50 text-red-700 ring-red-600/10"
                      : "bg-green-50 text-green-700 ring-green-600/20"
                  }`}
                >
                  {business.website !== "Non disponibile"
                    ? removeHttpAndWww(business.website)
                    : business.website}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              type="button"
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
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
                {Array.from({
                  length: Math.ceil(businesses.length / itemsPerPage),
                }).map((_, index) => (
                  <button
                    type="button"
                    key={index}
                    className={`
  relative inline-flex items-center px-4 py-2 text-sm font-semibold
  ${
    index + 1 === currentPage
      ? "bg-palette-primary text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-palette-dark"
      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
  }
`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
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
    </div>
  );
}
