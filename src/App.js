import React, { useEffect, useState } from "react";
import Appbar from "./components/Appbar";
import Main from "./layouts/Main";

function App() {
  const [terms, setTerms] = useState([]);
  useEffect(() => {
    fetch("http://heywilson2-env.eba-dj7ejeyb.us-east-2.elasticbeanstalk.com/api/v1/terms")
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
