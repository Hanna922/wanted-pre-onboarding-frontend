import NavItem from "./NavItem";
import "../style/css/Navigation.css";

function Navigation() {
  const menu = [
    { name: "Home", address: "/" },
    { name: "Todo", address: "/todo" },
    { name: "Sign In", address: "/signin" },
    { name: "Sign Up", address: "/signup" },
  ];

  return (
    <nav className="navigation-wrapper">
      <div className="menu-list">
        {menu.map((data) => (
          <NavItem key={data.address} data={data} />
        ))}
      </div>
    </nav>
  );
}

export default Navigation;