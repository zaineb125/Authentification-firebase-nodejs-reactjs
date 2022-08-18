import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import MyNavbar from "./components/MyNavbar";
import LogOut from "./components/LogOut";

function App() {
  return (
    <Router>
      <div className="App">
        <MyNavbar />
        <br/><br/>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/sign-in" element={<SignIn />} />
          <Route exact path="/log-out" element={<LogOut />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
