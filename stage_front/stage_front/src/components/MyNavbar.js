import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../assets/style.css";

const MyNavbar = () => {
  const location = useLocation();

  const [token, setToken] = useState("");

  const handleActive = (id, mylocation) => {
    const classes = document.querySelectorAll(".links");

    classes.forEach((_class) => {
      _class.classList.remove("color");
    });

    if (location.pathname === mylocation) {
      document.getElementById(id).classList.add("color");
    }
  };

  const handleClick = () => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      setToken(jwt);
    } else {
      setToken("");
    }

    const classes = document.querySelectorAll(".links");

    classes.forEach((_class) => {
      _class.classList.remove("color");
    });

    document.getElementById(location.pathname).classList.add("color");
  }, [location]);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/home" className="links" id="/home">
              Home
            </Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            {!token.length && (
              <Nav.Link>
                <Link to="/sign-in" className="links" id="/sign-in">
                  SignIn
                </Link>
              </Nav.Link>
            )}
            {!token.length && (
              <Nav.Link>
                <Link to="/sign-up" className="links" id="/sign-up">
                  Signup
                </Link>
              </Nav.Link>
            )}
            {token.length && (
              <Nav.Link>
                <Link
                  to="/log-out"
                  className="links"
                  onClick={handleClick}
                  id="/log-out"
                >
                  logout
                </Link>
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;
