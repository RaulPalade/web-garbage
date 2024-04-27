import { AuthRepository } from "../../domain/repository/AuthRepository";
import { restorePassword } from "../../domain/usecase/RestorePasswordUseCase";
import { signIn } from "../../domain/usecase/SignInUseCase";
import { signOut } from "../../domain/usecase/SignOutUseCase";

export function useAuthModelController(authRepository: AuthRepository) {
  const handleSignIn = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    return await signIn(email, password, authRepository);
  };

  const handleSignOut = async (): Promise<boolean> => {
    return await signOut(authRepository);
  };

  const handleRestorePassword = async (email: string): Promise<boolean> => {
    return await restorePassword(email, authRepository);
  };

  return {
    handleSignIn,
    handleSignOut,
    handleRestorePassword,
  };
}
