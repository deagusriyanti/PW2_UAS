import { useState, useEffect } from "react";
import api from "../api/axiosClient";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/pasien")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {data ? <p>Total pasien: {data.length}</p> : <p>Loading...</p>}
    </div>
  );
}
