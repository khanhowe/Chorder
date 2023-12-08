import './App.css';
import { AuthProvider } from './auth/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './pages/Login';
// import ProtectedRoute from "./components/ProtectedRoute";
import SignupForm from './pages/Signup';
import Home from './pages/Home';
import { ChordProvider } from './utils/ChordContext';
import { ProgressionProvider } from './utils/ProgressionContext';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/signup" element={<SignupForm />} />

                    <Route
                        path="/"
                        element={
                            <ProgressionProvider>
                              <ChordProvider>
                                  <Home />
                              </ChordProvider>
                            </ProgressionProvider>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
