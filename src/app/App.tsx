import { BrowserRouter, Route, Routes } from "react-router";
import { AppLayout } from "./AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HomePage, NotFoundPage, PoolPage } from "../pages";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="pool/:poolName" element={<PoolPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
