import { User } from "firebase/auth";
import { Result } from "../../domain/models";
import { AuthRepository } from "../../domain/repository/AuthRepository";
import { AuthDataSource } from "../datasource/AuthDataSource";
import { ResponseSuccess } from "../models/ApiResponse";
import { Failure, Success } from "../../domain/models/Result";

export class AuthRepositoryImpl implements AuthRepository {
  dataSource: AuthDataSource;
  constructor(dataSource: AuthDataSource) {
    this.dataSource = dataSource;
  }

  async signIn(email: string, password: string): Promise<Result<User>> {
    const signInResponse = await this.dataSource.signIn(email, password);
    if (signInResponse instanceof ResponseSuccess) {
      return new Success(signInResponse);
    } else {
      const error: string = (signInResponse as Failure<string>).error;
      return new Failure(error);
    }
  }

  async signOut(): Promise<Result<boolean>> {
    const signOutResponse = await this.dataSource.signOut();
    if (signOutResponse instanceof ResponseSuccess) {
      return new Success(signOutResponse);
    } else {
      const error: string = (signOutResponse as Failure<string>).error;
      return new Failure(error);
    }
  }

  async restorePassword(email: string): Promise<Result<boolean>> {
    const restorePasswordResponse = await this.dataSource.restorePassword(
      email
    );
    if (restorePasswordResponse instanceof ResponseSuccess) {
      return new Success(restorePasswordResponse);
    } else {
      const error: string = (restorePasswordResponse as Failure<string>).error;
      return new Failure(error);
    }
  }
}
