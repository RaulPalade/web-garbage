import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function ForgotPasswordFormComponent({
  onCancel,
  onEmailChange,
  restorePassword,
}: {
  onCancel: () => void;
  onEmailChange: (email: string) => void;
  restorePassword: () => void;
}) {
  const [email, setEmail] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    onEmailChange(newEmail); // Passa l'email al componente padre
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <div className="flex items-center justify-center mt-10">
          <button>
            <ArrowLongLeftIcon className="w-8" onClick={onCancel} />
          </button>
          <h2 className="flex-grow text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reimposta password
          </h2>
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-palette-dark sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              onClick={restorePassword}
              className="flex w-full justify-center rounded-md bg-palette-primary hover:bg-palette-dark px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-palette-dark"
            >
              Reimposta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
