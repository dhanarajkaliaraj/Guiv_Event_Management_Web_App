import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

function GeneralDetailForm({
  eventData,
  setEventData,
  currentStep,
  setCurrentStep,
}) {

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5">
      <Form.Item label="Event Name" required>
        <Input
          placeholder="Event Name"
          value={eventData.name}
          onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Description" required>
        <Input.TextArea
          placeholder="Description"
          value={eventData.description}
          onChange={(e) =>
            setEventData({ ...eventData, description: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Organiser" required>
        <Input
          placeholder="Organiser"
          value={eventData.organiser}
          onChange={(e) =>
            setEventData({ ...eventData, organiser: e.target.value })
          }
        />
      </Form.Item>
      <div className=" flex justify-between">
        <Button onClick={()=> navigate('/admin/events')}>Back</Button>
        <Button
          disabled={!eventData.name || !eventData.description || !eventData.organiser}
          type="primary"
          onClick={() => setCurrentStep(currentStep + 1)}>Next</Button>
      </div>
    </div>
  );
}

export default GeneralDetailForm;
