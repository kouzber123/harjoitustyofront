import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import NavBar from "../Components/Navbar";
import PollDashboard from "../Components/Dashboard/PollDashboard";
function App() {
  //set usestate as empty array
  const [epolls, setEpolls] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/Epolls").then(response => {
      setEpolls(response.data);
    });
  }, []);

  //passs the epollsdata as property
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <PollDashboard props={epolls} />
      </Container>
    </>
  );
}

export default App;
