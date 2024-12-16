// src/components/Navbar.tsx
import './Navbar.css';

interface NavbarProps {
  username: string;
  token: string;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ username, token, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="containerNavBar">
        <span className="username">Olá, {username}</span>
        <button className="logoutButton" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
