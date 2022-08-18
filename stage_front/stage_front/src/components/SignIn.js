import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import AlertDanger from "./AlertDanger";
import NotFound from "./NotFound";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  //handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    setIsSubmit(true);
    const errors = validate(user);
    console.log("errors" + JSON.stringify(errors));
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }

    setErrors({});

    try {
      fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((res) => {
          console.log("1" + res);
          if (res.status === 403) {
            console.log("errors");
            setErrors({ userRegistred: "false" });
          } else {
            console.log("ok");
            return res.json();
          }
        })
        .then((data) => {
          console.log(data);
          localStorage.setItem("token", data.jwt);
          navigate("/home");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  //validate
  const validate = (values) => {
    const error = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      error.email = "email is required !";
    }
    if (!values.password) {
      error.password = "password is required !";
    }
    return error;
  };

  return (
    <div className="container" style={{ marginTop: "5em" }}>
      {JSON.parse(JSON.stringify(errors))["userRegistred"] === "false" && (
        <NotFound />
      )}

      {Object.keys(errors).length !== 0 && <AlertDanger />}
      {Object.keys(errors).length === 0 && <div></div>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="error">{errors.email}</p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="error">{errors.password}</p>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignIn;
