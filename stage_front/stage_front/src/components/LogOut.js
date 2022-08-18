import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

const LogOut = () => {
  return (
    <Alert variant="danger" className="container" dismissible>
      <Alert.Heading>Oh You just logged out!</Alert.Heading>
      <p>
        If you change your mind your more than welcome to sign in again and
        benefit from our services !
      </p>
      <Link to="/sign-in" className="links" style={{ color: "red" }}>
        SignIn
      </Link>
    </Alert>
  );
};

export default LogOut;
