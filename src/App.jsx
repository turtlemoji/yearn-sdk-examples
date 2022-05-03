import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./Home";

import Balance from "./examples/Balance";
import Deposit from "./examples/Deposit";
import Withdraw from "./examples/Withdraw";
import Vaults from "./examples/Vaults";

import "./styles.scss";

export default function App() {
  const navLinks = [
    { to: "/", name: "Home", className: "header" },
    { to: "/balance", name: "Balances" },
    { to: "/deposit", name: "Deposit" },
    { to: "/withdraw", name: "Withdraw" },
    { to: "/vaults", name: "Vaults" },
  ];
  return (
    <Router>
      <div className="App">
        <div className="sidenav">
          <ul>
            {navLinks.map((link) => {
              return (
                <li key={link.name} className={link.className ?? null}>
                  <Link to={link.to}>{link.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="content">
          <h1>Yearn SDK Integration Examples</h1>

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/balance" element={<Balance />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/vaults" element={<Vaults />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
