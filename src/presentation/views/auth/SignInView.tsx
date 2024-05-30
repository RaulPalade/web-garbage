import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthRepository } from "../../../domain/repository/AuthRepository";
import { useAuthModelController } from "../../hooks/useAuthModelController";
import ForgotPasswordFormComponent from "../../components/forms/ForgotPasswordFormComponent";
import SignInForm, {
  SignInFormData,
} from "../../components/forms/SignInFormComponent";
import { FooterComponent } from "../../components/headers/FooterComponent";
import { showSuccessToast, showErrorToast } from "../../../utils/toastUtils";
import { CircularLoaderComponent } from "../../components/loaders/CircularLoaderComponent";
import generalAnimation from "../../../assets/lotties/generalAnimation.json";

export function SignInView({
  authRepository,
}: {
  authRepository: AuthRepository;
}) {
  const navigate = useNavigate();
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const [forgotPassword, setForgotPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState<string>("");

  const handleFormDataChange = (formData: SignInFormData) => {
    setFormData(formData);
  };

  const handleForgotPasswordEmailChange = (email: string) => {
    setForgotPasswordEmail(email);
  };

  const { handleSignIn, handleRestorePassword } =
    useAuthModelController(authRepository);

  const signIn = async () => {
    try {
      const result = await handleSignIn(formData.email, formData.password);
      if (result) {
        setLoginSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setLoginSuccess(false);
        showErrorToast(
          "Qualcosa è andato storto. Ti preghiamo di riprovare più tardi."
        );
      }
    } catch (error) {
      setLoginSuccess(false);
      showErrorToast(
        "Qualcosa è andato storto. Ti preghiamo di riprovare più tardi."
      );
    }
  };

  const restorePassword = async () => {
    try {
      const result = await handleRestorePassword(forgotPasswordEmail);
      if (result) {
        showSuccessToast("Email inviata");
        setForgotPassword(false);
      } else {
        showErrorToast(
          "Qualcosa è andato storto. Ti preghiamo di riprovare più tardi."
        );
      }
    } catch (error) {
      showErrorToast(
        "Qualcosa è andato storto. Ti preghiamo di riprovare più tardi."
      );
    }
  };

  return loginSuccess ? (
    <div className="flex items-center justify-center h-screen">
      <CircularLoaderComponent
        animation={generalAnimation}
        message={"Login in corso"}
      />
    </div>
  ) : (
    <div className="w-full min-h-full">
      {forgotPassword ? (
        <ForgotPasswordFormComponent
          onCancel={() => setForgotPassword(false)}
          onEmailChange={handleForgotPasswordEmailChange}
          restorePassword={restorePassword}
        />
      ) : (
        <SignInForm
          onForgotPassword={() => setForgotPassword(true)}
          signIn={signIn}
          onFormDataChange={handleFormDataChange}
        />
      )}

      <FooterComponent />
    </div>
  );
}
