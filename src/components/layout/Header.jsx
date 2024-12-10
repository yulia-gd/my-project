import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, UtensilsCrossed } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import "../../style/Header.css";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <Link to="/" className="logo-link">
            <UtensilsCrossed className="logo-icon" />
            <span className="site-name">
              World
              <span className="text-red-600 hover:text-red-600 transition-colors duration-300">
                Cuisine
              </span>
            </span>
          </Link>

          <nav className="nav">
            <Link to="/regions" className="nav-link">
              Regions
            </Link>
            <Link to="/establishments" className="nav-link">
              Establishments
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/saved" className="nav-link">
                  Saved Places
                </Link>
                <div className="auth-links">
                  <Link to="/profile" className="nav-link">
                    {user?.name}
                  </Link>
                  <button onClick={handleLogout} className="logout-button">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="auth-links">
                <Link to="/login" className="auth-button">
                  Login
                </Link>
                <Link to="/register" className="auth-button">
                  Register
                </Link>
              </div>
            )}
          </nav>

          <button
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="close-menu-button" />
            ) : (
              <Menu className="open-menu-button" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="flex flex-col space-y-4">
              <Link
                to="/regions"
                className="mobile-menu-item"
                onClick={() => setIsMenuOpen(false)}
              >
                Regions
              </Link>
              <Link
                to="/establishments"
                className="mobile-menu-item"
                onClick={() => setIsMenuOpen(false)}
              >
                Establishments
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/saved" className="mobile-menu-item">
                    Save Places
                  </Link>
                  <div className="auth-links">
                    <Link to="/profile" className="mobile-menu-item">
                      {user?.name}
                    </Link>
                    <button onClick={handleLogout} className="mobile-menu-item">
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="auth-links">
                  <Link to="/login" className="auth-button">
                    Login
                  </Link>
                  <Link to="/register" className="auth-button">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
