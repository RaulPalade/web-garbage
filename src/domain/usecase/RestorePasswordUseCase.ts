import { Success } from "../models/Result";
import { AuthRepository } from "../repository/AuthRepository";

export async function restorePassword(
  email: string,
  repository: AuthRepository
): Promise<boolean> {
  const result = await repository.restorePassword(email);
  if (result instanceof Success) {
    return result.value;
  } else {
    return false;
  }
}
