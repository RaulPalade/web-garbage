import { Business } from "../../../domain/models";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export function DesktopTableComponent({
  businesses,
}: {
  businesses: Business[];
}) {
  const removeHttpAndWww = (url: string) => {
    return url.replace(/^(https?:\/\/)?(www\.)?/i, "").replace(/\/$/, "");
  };

  return (
    <table className="min-w-full divide-y divide-gray-100">
      <tbody>
        {businesses.map((business) => (
          <tr
            key={business.id}
            className="relative cursor-pointer transition-all duration-300 hover:bg-palette-lighter"
          >
            <td className="py-4 px-4 text-left">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {business.name}
              </p>
              <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                {business.street}, {business.city}
              </span>
            </td>
            <td className="py-4 px-4 text-left">
              <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-purple-700/10">
                {business.category}
              </span>
            </td>
            <td className="py-4 px-4 text-left sm:table-cell">
              <p className="text-sm leading-6 text-gray-900">
                {business.reviews} reviews
              </p>
              <p className="text-sm leading-6 text-gray-900">
                {business.score} stars
              </p>
            </td>
            <td className="py-4 px-4 text-right sm:table-cell">
              <p className="text-sm leading-6 text-gray-900">
                {business.phone}
              </p>
              <span
                className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                  business.website === "Sito web non disponibile"
                    ? "bg-red-50 text-red-700 ring-red-600/10"
                    : "bg-green-50 text-green-700 ring-green-600/20"
                }`}
              >
                {business.website !== "Sito web non disponibile"
                  ? removeHttpAndWww(business.website)
                  : business.website}
              </span>
            </td>
            <td className="py-4 pl-6 text-right">
              <ChevronRightIcon
                className="h-5 w-5 text-palette-primary"
                aria-hidden="true"
              />
            </td>
            {/* Elemento a sovrapposto che rende cliccabile l'intera riga */}
            <a
              href={`/businesses/${business.id}`}
              className="absolute inset-0 z-10"
              aria-label={`View details of ${business.name}`}
            ></a>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
