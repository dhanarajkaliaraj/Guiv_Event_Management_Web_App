import { useState } from "react";
import { Steps, Form, message } from "antd";

import GeneralDetailForm from "./general";
import LocationAndDateForm from "./location-and-date";
import TicketForm from "./ticket";
import MediaForm from "./media";
import { useNavigate } from "react-router-dom";
import { createEvent, updateEvent } from "../../../../../../api-services/events-service";
import  uploadImageToCloudinary from "../../../../../../api-services/image-uploader-get-url";


function EventForm({initialData={}, type='create'}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [eventData, setEventData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [selectedMediaFiles, setSelectedMediaFiles] = useState([]);
  const navigate = useNavigate();
 
  const onFinish = async () => {
    try {
      const [...urls] = await Promise.all(
        selectedMediaFiles.map(async (file) => {
        return uploadImageToCloudinary(file.originFileObj);
        })
      );
     
      console.log("eventData", eventData,urls);
      eventData.media = type==='create' ? [...urls]:[...eventData.media, ...urls];
      if(type === 'create') {
        await createEvent(eventData);
        message.success("Event created successfully");

      } else {
        await updateEvent(eventData._id, eventData);
        message.success("Event updated successfully");
      }
      navigate("/admin/events");
    } catch (error) {
      message.error(error.message);
    }
  };

  const commonProps = {
    eventData,
    setEventData,
    currentStep,
    setCurrentStep,
    selectedMediaFiles,
    setSelectedMediaFiles,
    loading,
    setLoading,
    onFinish,
  };

  const stepData = [
    {
      title: "General Details",
      component: <GeneralDetailForm {...commonProps} />,
    },
    {
      title: "Location & Date",
      component: <LocationAndDateForm {...commonProps} />,
    },
    {
      title: "Media",
      component: <MediaForm {...commonProps} />,
    },
    {
      title: "Tickets",
      component: <TicketForm {...commonProps} />,
    },
  ];

  return (
    <div>
      <div className="mt-5">
        <Steps
          size="small"
          current={currentStep}
          items={stepData}
          onChange={(step) => setCurrentStep(step)}
        />
      </div>
      <Form layout="vertical">
        <div className="mt-5">{stepData[currentStep].component}</div>
      </Form>
    </div>
  );
}

export default EventForm;
