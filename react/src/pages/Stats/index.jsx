import { useEffect, useState } from "react";
import { getStats } from "./../../services/card.js";
import Top from "./Top";
import ByDays from "./ByDays";
import Unique from "./Unique";
export default function Stats() {
  let [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    top5: [],
    byDays: [],
    uniqueSold: [],
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      let data = await getStats();
      if (data.data.success) {
        setStats(data.data.data);
      } else {
        console.log(`Err: ' ${data.data.message}`);
      }
      setLoading(false);
    })();
  }, []);
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="row">
          <Top data={stats.top5} />
          <ByDays data={stats.byDays} />
          <Unique data={stats.uniqueSold} />
        </div>
      )}
    </div>
  );
}
