import { Button, InputNumber, Input } from "antd";
import React from "react";

function TicketsForm({
  eventData,
  setEventData,
  setCurrentStep,
  currentStep,
  loading,
  onFinish,
}) {
  const onAddTicketType = () => {
    const newTicketTypes = eventData.tickets || [];
    newTicketTypes.push({ name: "", price: 0, limit: 0 });
    setEventData({ ...eventData, tickets: newTicketTypes });
  };
  const onChangeTicketType = (key, value, index) => {
    const newTicketTypes = eventData.tickets || [];
    newTicketTypes[index][key] = value;
    setEventData({ ...eventData, tickets: newTicketTypes });
  };

  const removeRow = (index) => {
    const newTicketTypes = eventData.tickets || [];
    newTicketTypes.splice(index, 1);
    setEventData({ ...eventData, tickets: newTicketTypes });
  };

  return (
    <div>
      <Button className="mt-4" onClick={onAddTicketType}>
        Add Ticket Type
      </Button>
      {eventData?.tickets?.length > 0 && (
        <div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            <span>Name</span>
            <span>Price</span>
            <span>Limit</span>
          </div>
          <div>
            {eventData.tickets.map((ticketType, index) => {
              return (
                <div className="grid grid-cols-4 gap-4" key={index}>
                  <Input
                    className="border border-gray-300 rounded-lg p-2"
                    value={ticketType.name}
                    onChange={(e) =>
                      onChangeTicketType("name", e.target.value, index)
                    }
                  />
                  <InputNumber
                    className="border border-gray-300 rounded-lg p-2"
                    style={{ width: "100%" }}
                    value={ticketType.price}
                    min={0}
                    onChange={(value) =>
                      onChangeTicketType("price", value, index)
                    }
                  />
                  <InputNumber
                    className="border border-gray-300 rounded-lg p-2"
                    style={{ width: "100%" }}
                    min={0}
                    value={ticketType.limit}
                    onChange={(value) =>
                      onChangeTicketType("limit", value, index)
                    }
                  />
                  <Button danger type="text" onClick={() => removeRow(index)}>
                    Delete
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex justify-between col-span-3 mt-5">
        <Button
          disabled={loading}
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Back
        </Button>
        <Button disabled={loading} loading={loading} type="primary" onClick={onFinish}>
          Save and Finish
        </Button>
      </div>
    </div>
  );
}

export default TicketsForm;
