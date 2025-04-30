import { MapPin, Timer } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";


function EvenCard({ event }) {

  const mainImg = event?.media[0];
  const navigate = useNavigate();

  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 border border-solid border-gray-200 mb-4">
      <div className="col-span-1">
        <img
          src={mainImg}
          alt={event.name}
          className="w-56 h-56 object-cover rounded-lg"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-3 p-3">
        <h1 className="text-xl font-bold mt-2">{event.name}</h1>
        <p className="text-gray-600 text-sm">{event.description}</p>
        
          <div className="flex justify-between items-center text-sm">
            <div className="p-1 bg-gray-100 rounded-l">
              <div className="flex gap-2 mb-2">
                <MapPin sixe={16} />
                <p>
                  {event.address}, {event.city}, {event.pin}
                </p>
              </div>
              <div className="flex gap-2">
                <Timer sixe={16} />
                <p>
                  {event.date}, {event.time}
                </p>
              </div>
            </div>
            <button onClick={()=>navigate(`/event/${event._id}`)} className="bg-blue-500 text-white px-4 py-2 rounded mt-4 text-sm">
              View Details
            </button>
          </div>
        
      </div>
    </div>
  );
}

export default EvenCard;
