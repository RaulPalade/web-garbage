import { Business } from "../../../domain/models";

export function MobileTableComponent({
  businesses,
}: {
  businesses: Business[];
}) {
  const removeHttpAndWww = (url: string) => {
    return url.replace(/^(https?:\/\/)?(www\.)?/i, "").replace(/\/$/, "");
  };

  return (
    <ul className="divide-y divide-gray-100">
      {businesses.map((business) => (
        <li
          key={business.id}
          className="relative flex justify-center gap-x-6 py-4 px-4 cursor-pointer transition-all duration-300 hover:bg-palette-lighter"
        >
          <a
            href={`/businesses/${business.id}`}
            className="absolute inset-0 z-10"
            onClick={(e) => e.stopPropagation()} // Per evitare conflitti con i link interni
            aria-label={`View details of ${business.name}`}
          ></a>

          <div className="flex flex-col justify-center items-center space-y-1 z-20">
            {/* Impostato z-index maggiore */}
            <p className="text-sm font-semibold leading-6 text-gray-900 text-left">
              {business.name}
            </p>
            <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 text-left">
              {business.street}, {business.city}
            </span>
            <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 flex-grow text-left">
              {business.category}
            </span>
            <p className="text-sm leading-6 text-gray-900 text-right">
              <a
                href={`tel:${business.phone}`}
                onClick={(e) => e.stopPropagation()} // Impedisce che il click del telefono attivi il link dell'intera riga
              >
                {business.phone}
              </a>
            </p>
            <span
              className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                business.website === "Sito web non disponibile"
                  ? "bg-red-50 text-red-700 ring-red-600/10"
                  : "bg-green-50 text-green-700 ring-green-600/20"
              } text-right`}
            >
              {business.website !== "Sito web non disponibile"
                ? removeHttpAndWww(business.website)
                : business.website}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
