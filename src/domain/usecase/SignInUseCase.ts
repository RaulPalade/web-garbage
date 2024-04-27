import { Success } from "../models/Result";
import { AuthRepository } from "../repository/AuthRepository";

export async function signIn(
  email: string,
  password: string,
  repository: AuthRepository
): Promise<boolean> {
  const result = await repository.signIn(email, password);
  if (result instanceof Success) {
    return result.value;
  } else {
    return false;
  }
}
