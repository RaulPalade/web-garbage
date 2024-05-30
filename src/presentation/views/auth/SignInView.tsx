import { AuthRepository } from "../../../domain/repository/AuthRepository";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../../../utils/toastUtils";
import ForgotPasswordFormComponent from "../../components/ForgotPasswordFormComponent";
import SignInForm, {
  SignInFormData,
} from "../../components/SignInFormComponent";
import { useAuthModelController } from "../../hooks/useAuthModelController";
import { FooterComponent } from "../../components/FooterComponent";

export function SignInView({
  authRepository,
}: {
  authRepository: AuthRepository;
}) {
  const navigate = useNavigate();
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
        showSuccessToast("Accesso eseguito");
        navigate("/");
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

  return (
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
