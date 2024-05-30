import { AuthRepository } from "../repository/AuthRepository";
import { Success } from "../models/Result";

export async function signOut(repository: AuthRepository): Promise<boolean> {
  const result = await repository.signOut();
  if (result instanceof Success) {
    return result.value;
  } else {
    return false;
  }
}
