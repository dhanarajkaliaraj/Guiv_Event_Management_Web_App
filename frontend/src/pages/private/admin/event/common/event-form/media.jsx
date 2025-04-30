import React, { useState } from "react";
import { Upload, Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const MediaForm = ({
  currentStep,
  setCurrentStep,
  selectedMediaFiles,
  setSelectedMediaFiles,
  eventData,
  setEventData,
}) => {
  // const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);

  // Handle image preview
  const handlePreview = (file) => {
    setPreviewImage(URL.createObjectURL(file.originFileObj));
    setPreviewVisible(true);
  };

  // Handle file changes
  const handleChange = ({ fileList }) => {
    setSelectedMediaFiles([...fileList]);
  };

  // Restrict file types (Only JPG/PNG)
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      alert("You can only upload JPG/PNG files!");
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const removeImage = (removeIndex) => {
    setSelectedMediaFiles((prev) =>
      prev.filter((_, index) => index !== removeIndex)
    );
  };

  const removeAlreadyUploadedImage = (removeIndex) => {
    const existingMediaFiles = [...eventData.media];
    const newMediaFiles = existingMediaFiles.filter((_, index) => index !== removeIndex);
    setEventData((prev) => ({
      ...prev,
      media: newMediaFiles,
    }));
  }

  return (
    <>
      <Upload
        multiple
        listType="picture-card"
        fileList={selectedMediaFiles}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        showUploadList={false}
      >
        {selectedMediaFiles.length < 5 && (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
      <div className="flex gap-10 mt-10 flex-wrap">
        {selectedMediaFiles.map((file, index) => (
          <div className="p-1  bg-gray-200 rounded-md mb-10" key={index}>
            <img
              key={file.uid}
              src={URL.createObjectURL(file.originFileObj)}
              alt="uploaded"
              className="w-[100px] h-[100px] object-cover rounded-md cursor-pointer"
              onClick={() => handlePreview(file)}
            />
            <p
              className="text-center underline pt-1 text-xs cursor-pointer"
              onClick={() => removeImage(index)}
            >
              Remove
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-10 mt-10 flex-wrap">
        {eventData?.media?.map((url, index) => (
          <div className="p-1  bg-gray-200 rounded-md mb-10" key={index}>
            <img
              key={url}
              src={url}
              alt="uploaded"
              className="w-[100px] h-[100px] object-cover rounded-md cursor-pointer"
              onClick={() => handlePreview(url)}
            />
            <p
              className="text-center underline pt-1 text-xs cursor-pointer"
              onClick={() => removeAlreadyUploadedImage(index)}
            >
              Remove
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-between col-span-3">
        <Button onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>
        <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)}>
          Next
        </Button>
      </div>

      {/* Modal for image preview */}
      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default MediaForm;
