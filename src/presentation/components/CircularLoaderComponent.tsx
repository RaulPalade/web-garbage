import Lottie from "react-lottie";

export function CircularLoaderComponent({
  animation,
  message,
}: {
  animation: any;
  message: string;
}) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex flex-col space-y-6 items-center p-10">
      <Lottie options={defaultOptions} height={400} width={400} />
      <p className="text-2xl font-bold text-palette-primary">{message}</p>
    </div>
  );
}
