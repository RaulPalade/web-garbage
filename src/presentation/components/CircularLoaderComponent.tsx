export function CircularLoaderComponent() {
  return (
    <div
      className="inline-block h-12 w-12 mr-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    ></div>
  );
}
