import { AuthRepository } from "../domain/repository/AuthRepository";
import { HeaderComponent } from "./components/HeaderComponent";
import { FooterComponent } from "./components/FooterComponent";

export function DashboardView({
  authRepository,
}: {
  authRepository: AuthRepository;
}) {
  return (
    <div className="w-full min-h-full">
      <HeaderComponent authRepository={authRepository} />

      <FooterComponent />
    </div>
  );
}
