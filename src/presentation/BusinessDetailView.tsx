import { useLocation } from "react-router-dom";
import { AuthRepository } from "../domain/repository";
import { BusinessRepository } from "../domain/repository/BusinessRepository";
import { Business } from "../domain/models";
import { FooterComponent } from "./components/FooterComponent";
import { HeaderComponent } from "./components/HeaderComponent";
import { StarIcon } from "@heroicons/react/24/outline";
import { APIProvider, AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

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

  return (
    <div className="w-full min-h-full">
      <HeaderComponent authRepository={authRepository} />
      <div className="p-10">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            {business.name}
          </h3>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Sito web
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {business.website}
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
          </dl>
        </div>
        {apiKey && mapId && (
          <APIProvider apiKey={apiKey}>
            <Map
              style={{ height: "400px" }}
              defaultZoom={14}
              center={position}
              mapId={mapId}
            >
              <AdvancedMarker position={position} />
            </Map>
          </APIProvider>
        )}
      </div>
      <FooterComponent />
    </div>
  );
}
