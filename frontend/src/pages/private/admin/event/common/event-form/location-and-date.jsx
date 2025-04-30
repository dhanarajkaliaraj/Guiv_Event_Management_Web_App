import {Form, Input, Button} from "antd";

function LocationAndDateForm({currentStep, setCurrentStep, eventData, setEventData}) {

  return (
    <div className="grid grid-col-1 lg:grid-col-3 gap-5">
      <Form.Item label="Address" required>
        <Input
          placeholder="Address"
          value={eventData.address}
          onChange={(e) => setEventData({ ...eventData, address: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="City" required>
        <Input
          placeholder="City"
          value={eventData.city}
          onChange={(e) =>
            setEventData({ ...eventData, city: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Pincode" required>
        <Input
          placeholder="Pincode"
          value={eventData.pincode}
          onChange={(e) =>
            setEventData({ ...eventData, pincode: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item label="Date" required>
        <Input
          placeholder="Date"
          type='date'
          value={eventData.date}
          onChange={(e) =>
            setEventData({ ...eventData, date: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item label="Time" required>
        <Input
          placeholder="Time"
          type='time'
          value={eventData.time}
          onChange={(e) =>
            setEventData({ ...eventData, time: e.target.value })
          }
        />
      </Form.Item>
      <div className="flex justify-between col-span-3">
        <Button onClick={()=> setCurrentStep(currentStep - 1)}>Back</Button>
        <Button
          disabled={!eventData.address || !eventData.city || !eventData.pincode || !eventData.date || !eventData.time}
          type="primary"
          onClick={() => setCurrentStep(currentStep + 1)}>Next</Button>
      </div>
    </div>
  )
}

export default LocationAndDateForm