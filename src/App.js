import logo from "./logo.svg";
import "./App.css";
import Search from "./Components/Search";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Header from "./Components/Header";
import Details from "./Components/Details";
import PaymentDetails from "./Components/PaymentDetails";
import Login from "./Components/Admin/Login";

function App() {
  return (
    <Container>
      <div className="App">
        <Header />
        <Router>
          <Route path="/" component={Search} exact />
          <Route path="/details" component={Details} exact />
          <Route path="/success" component={PaymentDetails} exact />
          <Route path="/adminlogin" component={Login} exact />
        </Router>
      </div>
    </Container>
  );
}

export default App;
