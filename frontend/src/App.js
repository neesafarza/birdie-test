import "./App.css";
import { AppBar } from "./component/appBar";
import { MainApp } from "./component/mainApp";

function App() {
  return (
    <>
      <AppBar />
      <div className="App" data-testid="app">
        <MainApp />
      </div>
    </>
  );
}

export default App;
