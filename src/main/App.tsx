import "./App.css";
import "../firebase.config";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importa BrowserRouter
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthDataSourceImpl } from "../data/datasource/AuthDataSourceImpl";
import { AuthRepositoryImpl } from "../data/repository/AuthRepositoryImpl";
import { DashboardView } from "../presentation/DashboardView";
import { NotFoundView } from "../presentation/NotFoundView";
import { PrivateRoute } from "../presentation/auth/PrivateRoute";
import { SignInView } from "../presentation/auth/SignInView";

const authDataSource = new AuthDataSourceImpl();
const authRepository = new AuthRepositoryImpl(authDataSource);

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="*" element={<NotFoundView />} />
          <Route
            path="/signIn"
            element={<SignInView authRepository={authRepository} />}
          />
          <Route path="/" element={<PrivateRoute />}>
            <Route
              path="/dashboard"
              element={<DashboardView authRepository={authRepository} />}
            />
          </Route>
        </Routes>
        <ToastContainer autoClose={3000} />
      </>
    </Router>
  );
}

export default App;
