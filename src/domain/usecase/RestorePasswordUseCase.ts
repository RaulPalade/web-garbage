import { AuthRepository } from "../repository/AuthRepository";
import { Success } from "../models/Result";

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
