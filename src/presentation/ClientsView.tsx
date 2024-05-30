import { AuthRepository } from "../domain/repository";
import { BusinessRepository } from "../domain/repository/BusinessRepository";

export function ClientsView({
  authRepository,
  businessRepository,
}: {
  authRepository: AuthRepository;
  businessRepository: BusinessRepository;
}) {
  return <div></div>;
}
