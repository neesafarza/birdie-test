import "./App.css";
import { AppBar } from "./component/appBar";
import { MainApp } from "./component/mainApp";

function App() {
  return (
    <>
      <AppBar />
      <div className="App">
        <MainApp />
      </div>
    </>
  );
}

export default App;
