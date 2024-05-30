import { Business } from "../../../domain/models";
import { CheckIcon, TrashIcon } from "@heroicons/react/24/outline";

export function DesktopBusinessDetailHeader({
  handleDelete,
  business,
  handleEditStatus,
}: {
  handleDelete: () => void;
  business: Business;
  handleEditStatus: () => void;
}) {
  return (
    <div className="flex justify-between px-4 sm:px-0">
      <div className="flex space-x-4">
        <button
          type="button"
          className="relative -m-2 inline-flex items-center justify-center rounded-md h-10 w-10 p-2 text-white bg-green-500 hover:bg-green-600 transition duration-200"
          onClick={() => {}}
        >
          <span className="absolute -inset-0.5" />
          <span className="sr-only">Conferma</span>
          <CheckIcon className="h-6 w-6" aria-hidden="true" />
        </button>

        <button
          type="button"
          className="relative -m-2 inline-flex items-center justify-center rounded-md h-10 w-10 p-2 text-white bg-red-500 hover:bg-red-600 transition duration-200"
          onClick={handleDelete}
        >
          <span className="absolute -inset-0.5" />
          <span className="sr-only">Elimina</span>
          <TrashIcon className="h-6 w-6" aria-hidden="true" />
        </button>

        <h3 className="text-xl font-bold leading-7 text-gray-900">
          {business.name}
        </h3>
      </div>

      <button onClick={handleEditStatus}>
        <span
          className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
            business.contacted
              ? "bg-green-50 text-green-700 ring-green-600/10"
              : "bg-red-50 text-red-700 ring-red-600/10"
          }`}
        >
          {business.contacted ? "Contattato" : "Non contattato"}
        </span>
      </button>
    </div>
  );
}
