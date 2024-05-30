import { useState } from "react";
import logo from "../../../assets/images/garbage.svg";

export interface SignInFormData {
  email: string;
  password: string;
}

export default function SignInFormComponent({
  onForgotPassword,
  onFormDataChange,
  signIn,
}: {
  onForgotPassword: () => void;
  onFormDataChange: (formData: SignInFormData) => void;
  signIn: () => void;
}) {
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });

  const onMutate = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    let value: any = e.target.value;

    if (value === "true" || value === "false") {
      value = value === "true";
    }

    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: value,
    }));

    onFormDataChange({
      ...formData,
      [e.target.id]: value,
    });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img src={logo} className="mx-auto h-20 w-auto" alt="logo" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Accedi alla dashboard
        </h2>
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
                value={formData.email}
                onChange={onMutate}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-palette-dark sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <button
                  className="font-semibold text-palette-primary hover:text-palette-dark"
                  onClick={onForgotPassword}
                >
                  Password dimenticata?
                </button>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={onMutate}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-palette-dark sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              onClick={signIn}
              className="flex w-full justify-center rounded-md bg-palette-primary hover:bg-palette-dark px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-palette-dark"
            >
              Accedi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
