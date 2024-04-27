export function NotFoundView() {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-palette-primary">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Pagina non trovata
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Ops, non siamo riusciti a trovare la pagina che stavi cercando.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="https://gobarber.it"
            className="rounded-md bg-palette-primary hover:bg-palette-dark px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-palette-dark"
          >
            Torna alla home
          </a>
          <a
            href="mailto:gobarber.info@gmail.com"
            className="text-sm font-semibold text-gray-900"
          >
            Contatta il supporto <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
}
