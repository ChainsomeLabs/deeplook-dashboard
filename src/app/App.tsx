import { BrowserRouter, Route, Routes } from "react-router";
import { AppLayout } from "./AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home, NotFound, Pool } from "../pages";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="pool/:poolName" element={<Pool />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
