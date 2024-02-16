import "./App.css";
import Form from "./components/form/form";
import Table from "./components/table/table";

const App = () => {
  return (
    <div className="page-container">
      <Form/>
      <div className="table-container">
        <h2>BILLS</h2>
        <Table/>
      </div>
    </div>
  );
};

export default App;
