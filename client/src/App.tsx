import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ErrorProvider } from './context/ErrorContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Dashboard } from './pages/Dashboard';
import { AdminLogin } from './pages/AdminLogin';
import { ProjectDetails } from './pages/ProjectDetails';
import { NotFound } from './pages/NotFound';
import { ProtectedAdminRoute } from './components/common/ProtectedAdminRoute';
import './index.css';

// Main app layout
const AppLayout = () => {
  return (
    <div className="app-layout">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedAdminRoute>
                <Dashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ErrorProvider>
          <AuthProvider>
            <AppLayout />
          </AuthProvider>
        </ErrorProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
