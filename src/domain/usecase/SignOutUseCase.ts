import { Success } from "../models/Result";
import { AuthRepository } from "../repository/AuthRepository";

export async function signOut(repository: AuthRepository): Promise<boolean> {
  const result = await repository.signOut();
  if (result instanceof Success) {
    return result.value;
  } else {
    return false;
  }
}
