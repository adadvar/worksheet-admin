import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
import Worksheets from "./pages/Worksheets";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import { DarkModeProvider } from "./context/DarkModeContext";
import { Toaster } from "react-hot-toast";
import PageNotFound from "./pages/PageNotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="worksheets" element={<Worksheets />} />
              <Route path="orders" element={<Orders />} />
              <Route path="settings" element={<Settings />} />
              <Route path="users" element={<Users />} />
              <Route path="account" element={<Account />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
