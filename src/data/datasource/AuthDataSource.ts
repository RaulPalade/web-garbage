import { User } from "firebase/auth";
import { ApiResponse } from "../models/ApiResponse";

export interface AuthDataSource {
  signIn(email: string, password: string): Promise<ApiResponse<User>>;
  signOut(): Promise<ApiResponse<boolean>>;
  restorePassword(email: string): Promise<ApiResponse<boolean>>;
}
