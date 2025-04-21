import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { BrowserRouter } from "react-router-dom";
import App from "./routes.jsx";
import AuthenticationProvider from "@app/context/AuthenticationContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthenticationProvider>
    </QueryClientProvider>
  </StrictMode>
);
