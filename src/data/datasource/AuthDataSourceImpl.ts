import { User, sendPasswordResetEmail, signOut } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthDataSource } from "./AuthDataSource";
import {
  ApiResponse,
  ResponseFailure,
  ResponseSuccess,
} from "../models/ApiResponse";

export class AuthDataSourceImpl implements AuthDataSource {
  auth = getAuth();

  async signIn(email: string, password: string): Promise<ApiResponse<User>> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return new ResponseSuccess(userCredential.user);
    } catch (error) {
      return new ResponseFailure("Something went wrong");
    }
  }

  async signOut(): Promise<ApiResponse<boolean>> {
    try {
      await signOut(this.auth);
      return new ResponseSuccess(true);
    } catch (e) {
      return new ResponseFailure("Something went wrong");
    }
  }

  async restorePassword(email: string): Promise<ApiResponse<boolean>> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      return new ResponseSuccess(true);
    } catch (e) {
      return new ResponseFailure("Something went wrong");
    }
  }
}
