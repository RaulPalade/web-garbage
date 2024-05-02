import { useLocation } from "react-router-dom";
import { AuthRepository } from "../domain/repository";
import { BusinessRepository } from "../domain/repository/BusinessRepository";
import { Business } from "../domain/models";
import { FooterComponent } from "./components/FooterComponent";
import { HeaderComponent } from "./components/HeaderComponent";
import { PencilSquareIcon, StarIcon } from "@heroicons/react/24/outline";
import { APIProvider, AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { useBusinessModelController } from "./hooks/useBusinessModelController";
import { showErrorToast, showSuccessToast } from "../utils/toastUtils";

export function BusinessDetailView({
  authRepository,
  businessRepository,
}: {
  authRepository: AuthRepository;
  businessRepository: BusinessRepository;
}) {
  const location = useLocation();
  const business: Business = location.state.business;

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const mapId = process.env.REACT_APP_GOOGLE_MAPS_ID_KEY;

  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [addNote, setAddNote] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(
    business.notes.replace(/\\n/g, "\n")
  );

  const { handleUpdateBusiness } =
    useBusinessModelController(businessRepository);

  useEffect(() => {
    async function fetchGeocode() {
      const address = business.street + " " + business.city;
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=${apiKey}`
        );
        const data = await response.json();
        const { lat, lng } = data.results[0].geometry.location;
        setPosition({ lat, lng });
      } catch (error) {
        console.error("Error fetching geocode:", error);
      }
    }

    fetchGeocode();
  }, [business, apiKey, mapId]);

  const handleEditBusiness = async () => {
    const updatedBusiness = {
      ...business,
      notes: description.replace(/\n/g, "\\n"),
    };

    try {
      const updateResponse = await handleUpdateBusiness(
        business.id,
        updatedBusiness
      );
      if (updateResponse) {
        showSuccessToast("Modifica effettuata");
        setAddNote(false);
      } else {
        showErrorToast("Errore");
      }
    } catch (error) {
      showErrorToast("Errore");
    }
  };

  return (
    <div className="w-full min-h-full">
      <HeaderComponent authRepository={authRepository} />
      <div className="p-10">
        <div className="flex justify-between px-4 sm:px-0">
          <h3 className="text-xl font-bold leading-7 text-gray-900">
            {business.name}
          </h3>
          <span
            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
              business.contacted
                ? "bg-green-50 text-green-700 ring-green-600/10"
                : "bg-red-50 text-red-700 ring-red-600/10"
            }`}
          >
            {business.contacted ? "Contattato" : "Non contattato"}
          </span>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Sito web
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <a
                  href={business.website}
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
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
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
                    {description === "" ? (
                      <p>Nessuna nota</p>
                    ) : (
                      description
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
  );
}
