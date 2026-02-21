import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import StaffDashboard from "./pages/staff/StaffDashboard";
import SubjectDetail from "./pages/staff/SubjectDetail";
import StudentDashboard from "./pages/student/StudentDashboard";
import AssignmentView from "./pages/student/AssignmentView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
          <Route path="/staff/subject/:id" element={<SubjectDetail />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/assignment/:id" element={<AssignmentView />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
