import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertDanger from "./AlertDanger";
import UserExist from "./UserExist";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);


  const navigate = useNavigate();

  
  
  //handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      address,
      email,
      password,
      confirmPassword,
    };
    setIsSubmit(true);
    const error = validate(user);
    console.log("errors" + JSON.stringify(error));
    if (Object.keys(error).length) {
      setErrors(error);
      return;
    }
    setErrors({});
    try {
      fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            setErrors({ userRegistred: "true" });
          }
        })
        .then((data) => {
          console.log(data);
          localStorage.setItem("token", data.jwt);
          navigate("/home");
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const validate = (values) => {
    const error = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    console.log(JSON.stringify(values.email));
    //await findUserByEmail(values.email);


    if (!values.firstName) {
      error.firstName = "firstName is required !";
    }
    if (!values.lastName) {
      error.lastName = "lastName is required !";
    }
    if (!values.address) {
      error.address = "address is required !";
    }
    if (!values.email) {
      error.email = "email is required !";
    } else if (!regex.test(values.email)) {
      error.email = "This is not a valid email format!";
    }

    if (!values.password) {
      error.password = "password is required !";
    }
    if (!values.confirmPassword) {
      error.confirmPassword = "confirmPassword is required !";
    } else if (values.confirmPassword !== values.password) {
      error.confirmPassword = "Passwords dont match";
    }

    /*if (Object.keys(error).length === 0 && isSubmit === true) {
      navigate("/home");
    }*/
    return error;
    /*console.log("3)" + Object.keys(errors).length);
    console.log("3)" + Object.keys(errors));*/
  };

  return (
    <div className="container" style={{ marginTop: "5em" }}>
      {JSON.parse(JSON.stringify(errors))["userRegistred"] === "true" && (
        <UserExist />
      )}

      {Object.keys(errors).length !== 0 && <AlertDanger />}
      {Object.keys(errors).length === 0 && <div></div>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Form.Group className="mb-3" as={Col} controlId="formGridFirstName">
            <Form.Label>FirstName</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <p className="error">{errors.firstName}</p>
          </Form.Group>

          <Form.Group className="mb-3" as={Col} controlId="formGridLastName">
            <Form.Label>LastName</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <p className="error">{errors.lastName}</p>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              placeholder="Adress"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <p className="error">{errors.address}</p>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="error">{errors.email}</p>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="error">{errors.password}</p>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword1">
            <Form.Label>ConfirmPassword</Form.Label>
            <Form.Control
              type="password"
              placeholder="ConfirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <p className="error">{errors.confirmPassword}</p>
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;
