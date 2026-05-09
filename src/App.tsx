import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "./pages/Landing";
import Details from "./pages/Details";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound.tsx";
import { BackgroundMusic } from "./components/BackgroundMusic";
import { CurtainProvider } from "./components/CurtainTransition";

const queryClient = new QueryClient();

// Reset audio gate on every fresh page load so video always plays before music
localStorage.removeItem("musicEnabled");

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CurtainProvider>
          <BackgroundMusic />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/details" element={<Details />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CurtainProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
