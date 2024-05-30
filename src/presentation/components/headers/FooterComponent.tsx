export function FooterComponent() {
  return (
    <div id="contact" className="bg-white pt-24 ">
      <div className="py-10">
        <p className="text-center text-sm leading-6 text-slate-500 mt-6">
          © 2024 Web Garbage All rights reserved.
        </p>
        <div className="mt-10 flex w-full px-4 items-center justify-center text-center space-x-4 text-sm font-semibold leading-6 text-slate-700">
          <a href="/privacy-policy">Informativa sulla privacy</a>
          <div className="h-4 w-px bg-slate-500/20"></div>
          <a href="/terms-and-conditions">Termini e condizioni</a>
          <div className="hidden sm:block h-4 w-px bg-slate-500/20"></div>
          <a href="https://gowebb.it" className="hidden sm:block">
            Made by GoWebb
          </a>
        </div>
        <div className="sm:hidden mt-4 flex w-full px-4 items-center justify-center text-center space-x-4 text-sm font-semibold leading-6 text-slate-700">
          <a href="https://gowebb.it" className="sm:hidden">
            Made by GoWebb
          </a>
        </div>
      </div>
    </div>
  );
}
