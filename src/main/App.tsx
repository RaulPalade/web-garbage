import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../firebase.config";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthDataSourceImpl } from "../data/datasource/AuthDataSourceImpl";
import { AuthRepositoryImpl } from "../data/repository/AuthRepositoryImpl";
import { DashboardView } from "../presentation/views/dashboard/DashboardView";
import { NotFoundView } from "../presentation/NotFoundView";
import { PrivateRoute } from "../presentation/views/auth/PrivateRoute";
import { SignInView } from "../presentation/views/auth/SignInView";
import { BusinessDataSourceImpl } from "../data/datasource/BusinessDataSourceImpl";
import { BusinessRepositoryImpl } from "../data/repository/BusinessRepositoryImpl";
import { BusinessDetailView } from "../presentation/views/dashboard/BusinessDetailView";
import { ClientsView } from "../presentation/views/clients/ClientsView";
import { ClientDetailView } from "../presentation/views/clients/ClientDetailView";

const authDataSource = new AuthDataSourceImpl();
const authRepository = new AuthRepositoryImpl(authDataSource);
const businessDataSource = new BusinessDataSourceImpl();
const businessRepository = new BusinessRepositoryImpl(businessDataSource);

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
              path="/"
              element={
                <DashboardView
                  authRepository={authRepository}
                  businessRepository={businessRepository}
                />
              }
            />
          </Route>
          <Route path="/clients" element={<PrivateRoute />}>
            <Route
              path="/clients"
              element={
                <ClientsView
                  authRepository={authRepository}
                  businessRepository={businessRepository}
                />
              }
            />
          </Route>
          <Route
            path="/businesses/:businessId"
            element={
              <BusinessDetailView
                authRepository={authRepository}
                businessRepository={businessRepository}
              />
            }
          />
          <Route
            path="/clients/:clientId"
            element={
              <ClientDetailView
                authRepository={authRepository}
                businessRepository={businessRepository}
              />
            }
          />
        </Routes>
        <ToastContainer autoClose={3000} />
      </>
    </Router>
  );
}

export default App;
