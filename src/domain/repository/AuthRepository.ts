import { User } from "firebase/auth";
import { Result } from "../models/Result";

export interface AuthRepository {
  signIn(email: string, password: string): Promise<Result<User>>;
  signOut(): Promise<Result<boolean>>;
  restorePassword(email: string): Promise<Result<boolean>>;
}
