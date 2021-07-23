import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router";
import Search from "./Components/Search";
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" component={Search} />
      </BrowserRouter>
    </div>
  );
}

export default App;
