import { useLocation } from "react-router-dom";
import { AuthRepository } from "../../../domain/repository";
import { BusinessRepository } from "../../../domain/repository/BusinessRepository";
import { Business } from "../../../domain/models";
import { FooterComponent } from "../../components/FooterComponent";
import { HeaderComponent } from "../../components/HeaderComponent";
import { PencilSquareIcon, StarIcon } from "@heroicons/react/24/outline";
import { APIProvider, AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { useBusinessModelController } from "../../hooks/useBusinessModelController";
import { showErrorToast, showSuccessToast } from "../../../utils/toastUtils";
import { CollectionType } from "../../../data/datasource/BusinessDataSourceImpl";

export function ClientDetailView({
  authRepository,
  businessRepository,
}: {
  authRepository: AuthRepository;
  businessRepository: BusinessRepository;
}) {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const mapId = process.env.REACT_APP_GOOGLE_MAPS_ID_KEY;
  const location = useLocation();
  const businessId: string = location.state;
  const [business, setBusiness] = useState<Business>();
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [addNote, setAddNote] = useState<boolean>(false);

  const { handleGetBusinessById, handleUpdateBusiness } =
    useBusinessModelController(businessRepository);

  useEffect(() => {
    async function fetchBusiness() {
      try {
        const business = await handleGetBusinessById(
          CollectionType.Businesses,
          businessId
        );

        if (business) {
          setBusiness(business);
          const address = business.street + " " + business.city;
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              address
            )}&key=${apiKey}`
          );
          const data = await response.json();
          const { lat, lng } = data.results[0].geometry.location;
          setPosition({ lat, lng });
        } else {
          console.error("Business not found");
        }
      } catch (error) {
        console.error("Error fetching business:", error);
      }
    }

    fetchBusiness();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = async (
    updatedBusiness: Partial<Business>,
    successMessage: string,
    errorMessage: string
  ) => {
    try {
      const updateResponse = await handleUpdateBusiness(
        CollectionType.Businesses,
        businessId,
        updatedBusiness as Business
      );
      if (updateResponse) {
        showSuccessToast(successMessage);
      } else {
        showErrorToast(errorMessage);
      }
    } catch (error) {
      console.log(error);
      showErrorToast(errorMessage);
    }
  };

  const handleEditBusiness = async () => {
    const updatedBusiness: Partial<Business> = {
      notes: business?.notes.replace(/\n/g, "\\n"),
    };
    await handleUpdate(updatedBusiness, "Modifica effettuata", "Errore");
    setAddNote(false);
  };

  return business ? (
    <div className="w-full min-h-full">
      <HeaderComponent authRepository={authRepository} />
      <div className="p-10">
        <h3 className="text-xl font-bold leading-7 text-gray-900">
          {business.name}
        </h3>

        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Sito web
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-palette-primary hover:text-palette-dark"
                >
                  {business.website}
                </a>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Indirizzo
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {business.street}, {business.city}
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Telefono
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {business.phone}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Media recensioni
              </dt>
              <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {business.score}
                <StarIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Note
              </dt>

              {addNote ? (
                <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <div className="flex w-full flex-col">
                    <textarea
                      name="description"
                      rows={3}
                      id="description"
                      value={business.notes.replace(/\\n/g, "\n")}
                      onChange={(e) => {
                        setBusiness((prevBusiness) => ({
                          ...prevBusiness!,
                          notes: e.target.value,
                        }));
                      }}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:bg-palette-lighter sm:text-sm sm:leading-6"
                    />
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => setAddNote(false)}
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-900 hover:bg-palette-dark px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:bg-palette-dark focus:ring-offset-2"
                      >
                        Annulla
                      </button>
                      <button
                        onClick={handleEditBusiness}
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-palette-primary hover:bg-palette-dark px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:bg-palette-dark focus:ring-offset-2"
                      >
                        Salva
                      </button>
                    </div>
                  </div>
                </dd>
              ) : (
                <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 items-center">
                  <div>
                    {business.notes === "" ? (
                      <p>Nessuna nota</p>
                    ) : (
                      business.notes
                        .replace(/\\n/g, "\n")
                        .split("\n")
                        .map((line, index) => <p key={index}>{line}</p>)
                    )}
                  </div>

                  <button
                    onClick={() => setAddNote(true)}
                    className="ml-auto border border-palette-primary hover:bg-palette-lighter rounded-lg py-1 px-2"
                  >
                    <span className="flex items-center">
                      <PencilSquareIcon
                        className="h-5 w-5 mr-1"
                        aria-hidden="true"
                      />
                      <span className="hidden sm:inline-block">
                        {business.notes === "" ? "Aggiungi nota" : "Modifica"}
                      </span>
                    </span>
                  </button>
                </dd>
              )}
            </div>
          </dl>
        </div>
        <div className="mt-4">
          {apiKey && mapId && (
            <APIProvider apiKey={apiKey}>
              <div className="rounded-lg overflow-hidden">
                <Map
                  style={{ height: "400px" }}
                  defaultZoom={14}
                  center={position}
                  mapId={mapId}
                >
                  <AdvancedMarker position={position} />
                </Map>
              </div>
            </APIProvider>
          )}
        </div>
      </div>

      <FooterComponent />
    </div>
  ) : (
    <div>Business non trovato</div>
  );
}
