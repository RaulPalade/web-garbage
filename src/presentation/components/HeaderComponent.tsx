import { Fragment, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { AuthRepository } from "../../domain/repository/AuthRepository";
import { showSuccessToast, showErrorToast } from "../../utils/toastUtils";
import { useAuthModelController } from "../hooks/useAuthModelController";
import logo from "../../images/garbage.svg";

const navigation = {
  pages: [
    { name: "Catalogo", href: "/" },
    { name: "Clients", href: "/clients" },
  ],
};

export function HeaderComponent({
  authRepository,
}: {
  authRepository: AuthRepository;
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { handleSignOut } = useAuthModelController(authRepository);

  const signOut = async () => {
    try {
      const result = await handleSignOut();

      if (result) {
        showSuccessToast("Log out eseguito");
        navigate("/");
      } else {
        showErrorToast(
          "Qualcosa è andato storto. Ti preghiamo di riprovare più tardi."
        );
      }
    } catch (error) {
      showErrorToast(
        "Qualcosa è andato storto. Ti preghiamo di riprovare più tardi."
      );
    }
  };

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Chiudi menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <nav aria-label="Top" className="mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Apri menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">Your Company</span>
                  <img src={logo} className="h-8 w-auto" alt="logo" />
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              {/* Logout button */}
              <div className="ml-auto">
                <button
                  onClick={signOut}
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-palette-primary hover:bg-palette-dark px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:bg-palette-dark focus:ring-offset-2"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
