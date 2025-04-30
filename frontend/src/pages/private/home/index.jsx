import { useEffect, useState } from "react";
import { getEvents } from "../../../api-services/events-service";
import LoadingSpinner from "../../../components/loading-spinner";
import EvenCard from "./common/even-card";
import { useSelector } from "react-redux";
import FilterComponent from "./common/filter-component";

function Home() {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ searchText: "", date: "" });

  const user = useSelector((state) => state.user.value);

  const fetchEvents = async (filterObj) => {
    try {
      setLoading(true);
      const response = await getEvents(filterObj);
      setEventsData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents({ searchText: "", date: "" });
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mt-4 mx-4">
      <h1 className="mb-4 font-bold text-primary">Welcome, {user.name}</h1>
      <FilterComponent
        filters={filters}
        setFilters={setFilters}
        onFilters={fetchEvents}
      />
      {eventsData?.map((event, index) => (
        <EvenCard key={index} event={event} />
      ))}
    </div>
  );
}

export default Home;
