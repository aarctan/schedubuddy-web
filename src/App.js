import React, { useEffect, useState } from "react";
import Appbar from "./components/Appbar";
import Main from "./layouts/Main";

function App() {
  const [terms, setTerms] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/v1/terms")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTerms(data.objects);
      });
  }, []);

  return (
    <div>
      <Appbar />
      <Main terms={terms} />
    </div>
  );
}

export default App;
