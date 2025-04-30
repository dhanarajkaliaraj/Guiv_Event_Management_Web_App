import React, { useState } from "react";
import { Input, Button, message } from "antd";
import { createBooking } from "../../../../api-services/booking-service";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../../components/loading-spinner";

function TicketTypeSelection({ eventData }) {
  const { tickets, _id } = eventData;
  const [selectedTicketType, setSelectedTicketType] = useState("");
  const [selectedTicketCount, setSelectedTicketCount] = useState(1);
  const [maxCount, setMaxCount] = useState(1);
  const [loading, setloader] = useState(false);

  const navigate = useNavigate();

  const selectedTicketPrice = tickets.find(
    (ticket) => ticket.name === selectedTicketType
  )?.price;

  const totalPrice = selectedTicketPrice * selectedTicketCount || 0;

  const handleBooking = async () => {
    try {
      setloader(true);
      const bookingsPayload = {
        event: _id,
        ticketType: selectedTicketType,
        ticketsCount: selectedTicketCount,
        totalAmount: totalPrice,
      };

      const response = await createBooking(bookingsPayload);

      if (response.statusCode === 201) {
        message.success(
          "Tickets blocked successfully, you can pay and get your tickets directly from the event"
        );
        navigate("/profile/bookings");
      } else {
        message.error("Failed to block tickets");
      }
    } catch (error) {
      message.error("Failed to book tickets", error);
    } finally {
      setloader(false);
    }
  };

  if(loading) return <LoadingSpinner />

  return (
    <div className="my-5">
      <div>
        <h1 className="text-sm text-info font-bold">Select ticket type</h1>
        <div className="flex flex-wrap gap-5 mt-5">
          {tickets.map((ticket, index) => {
            const available = ticket.available ?? ticket.limit;
            return (
              <div
                key={index}
                className={`p-3 border border-gray-300 bg-gray-100 rounded-md lg:w-96 w-full pointer uppercase ${
                  selectedTicketType === ticket.name
                    ? "border-primary border-solid border-2"
                    : ""
                }`}
                onClick={() => {
                  setSelectedTicketType(ticket.name);
                  setMaxCount(available);
                }}
              >
                <p className="text-sm text-gray-700">{ticket.name}</p>
                <div className="flex justify-between">
                  <h1 className="text-sm font-bold">Rs. {ticket.price}</h1>
                  <h1 className="text-sm ">{available} Left</h1>
                </div>
              </div>
            )
          })}
        </div>
        <h1 className="text-sm text-info font-bold my-5">
          Select ticket count
        </h1>
        <Input
          className="w-96"
          value={selectedTicketCount}
          type="number"
          max={maxCount}
          min={1}
          placeholder="Enter ticket count"
          onChange={(e) => setSelectedTicketCount(parseInt(e.target.value))}
        />
      <span className="text-red-600">{selectedTicketCount > maxCount ? `Only ${maxCount} tickets available` : ''}</span>
        <div className="flex justify-between items-center mt-7 bg-gray-200 p-3 rounded-l">
          <p>Total Amount: Rs. {totalPrice}</p>
          <Button type="primary" onClick={handleBooking} disabled={selectedTicketCount > maxCount || !selectedTicketType || loading}>
            Block Tickets
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TicketTypeSelection;
