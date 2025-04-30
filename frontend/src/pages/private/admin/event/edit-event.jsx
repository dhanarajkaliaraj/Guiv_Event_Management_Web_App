import { useEffect, useState } from "react";
import PageTitle from "../../../../components/events-page-title";
import EventForm from "../event/common/event-form";
import { getEventById } from "../../../../api-services/events-service";
import { useParams } from "react-router-dom";
import { message } from "antd";
import LoadingSpinner from "../../../../components/loading-spinner";

function EditEventPage() {
  const [eventData, setEventData] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getEventById(params.id);
      console.log(response.data);
      setEventData(response.data);
      message.success("Event data fetched successfully");
    } catch (e) {
      console.error(e);
      message.error("Failed to fetch event");
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <LoadingSpinner />
    </div>;
  }

  return (
    <div className="mt-5 mx-5">
      <PageTitle title="Edit Event" />
      <div className="mt-5">
        <EventForm initialData={eventData} type='edit'/>
      </div>
    </div>
  );
}

export default EditEventPage;
