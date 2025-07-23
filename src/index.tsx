import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "@/styles/tailwind.css";
import "@/styles/index.css";
import { HelmetProvider } from 'react-helmet-async';
import ToastProvider from '@/components/ui/Toast';

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
      <ToastProvider />
    </HelmetProvider>
  </React.StrictMode>
);