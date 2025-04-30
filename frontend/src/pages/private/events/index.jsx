import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/loading-spinner";
import { getEventById } from "../../../api-services/events-service";
import { formatDateTime } from "../../../utils/dateformatter";
import { MapPin, Timer } from "lucide-react";
import { Image } from "antd";
import TicketTypeSelection from "./common/ticketTypeSelection";

function EventInfo() {
  const [eventData, setEventData] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getEventById(params.id); // Replace with your API endpoint
      setEventData(response.data);
    } catch (error) {
      console.error("Error fetching event data:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderEveryProperty = (label, value) => {
    return (
      <div className="flex flex-col text-sm">
        <span className="text-gray-500">{label}</span>
        <span className="text-gray-800 font-semibold">{value}</span>
      </div>
    );
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }
  
  return (
    eventData && ( <div className="mt-5 mx-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-x1 font-bold text-gray-600">{eventData.name}</h1>
        <div className="flex gap-10 text-gray-500">
          <div className="flex gap-1 items-center">
            <MapPin size={12} />
            <span className=" text-xs">
              {eventData.address}, {eventData.city}, {eventData.pincode}
            </span>
          </div>
          <div className="flex gap-1 items-center">
            <Timer size={12} />
            <span className="text-xs">
              {formatDateTime(`${eventData.date} ${eventData.time}`)}
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
        {eventData.media.map((url, index) => {
          return (
            <Image
              src={url}
              key={index}
              height={220}
              className="object-cover rounded"
            />
          );
        })}
      </div>
      <div className="mt-7">
        <p className="text-gray-600 text-sm">{eventData.description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-3 bg-gray-100 mt-5 gap-5">
        {renderEveryProperty('Organiser', eventData.organiser)}
          {renderEveryProperty('Address', eventData.address)}
          {renderEveryProperty('City', eventData.city)}
          {renderEveryProperty('Pincode', eventData.pincode)}
          {renderEveryProperty('Date', formatDateTime(`${eventData.date} ${eventData.time}`))}
      </div>
      <TicketTypeSelection eventData={eventData} />
    </div>)
  );
}

export default EventInfo;
