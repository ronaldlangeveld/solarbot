import HomeLayout from "./components/layouts/HomeLayout";
import Title from "./components/elements/title";
import Status from "./components/elements/Status";
import Heatmap from "./components/elements/Heatmap";
import { useState, useEffect } from "react";
import { getCurrentStatus } from './api/currentStatus';
import { getDailyCount } from "./api/dailyCount";


function App() {

  const [loading, setLoading] = useState(true);
  const [solarState, setSolarState] = useState(null);
  const [countData, setCountData] = useState(null);
  const [start, setStart] = useState(null);

  useEffect(() => {

    async function fetchData() {
      const solarState = await getCurrentStatus();
      setSolarState(solarState.data);
      const countData = await getDailyCount();
      setCountData(countData.data);
      setStart(countData.data[0].date);
      setLoading(false);
    };

    fetchData();

  }, [])
  return (
    <HomeLayout>
      {
        loading ? (
         <p>Loading....</p>
        ) : (
          <>
            <Title title="Inverter Status" className="text-3xl font-bold" />
            <Status dataset={solarState} />
            <Heatmap outages={countData} start={start}/>
          </>
        )
      }
    </HomeLayout>
  );
}

export default App;
