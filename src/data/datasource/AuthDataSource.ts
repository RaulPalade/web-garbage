import { ApiResponse } from "../models/ApiResponse";
import { User } from "firebase/auth";

export interface AuthDataSource {
  signIn(email: string, password: string): Promise<ApiResponse<User>>;
  signOut(): Promise<ApiResponse<boolean>>;
  restorePassword(email: string): Promise<ApiResponse<boolean>>;
}
