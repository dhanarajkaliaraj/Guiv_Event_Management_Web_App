import { Button, message, Table } from "antd";
import PageTitle from "../../../../components/events-page-title";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEvents, deleteEvent } from "../../../../api-services/events-service";
import { formatDate, formatDateTime } from "../../../../utils/dateformatter";
import { Pen, Trash2 } from "lucide-react";
import LoadingSpinner from "../../../../components/loading-spinner";

function EventPage() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getEvents({searchText:'', date:''});
      console.log("response", response);
      setEventData(response.data);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      setLoading(true);
      await deleteEvent(id);
      getData();
      message.success("Event deleted successfully");
    } catch (error) {
      console.error(error);
      message.error("Failed to delete event");
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Event Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      key: "date",
      render: (date) => {
        return formatDate(date);
      },
    },
    {
      title: "Organiser",
      dataIndex: "organiser",
      key: "organiser",
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => {
        return formatDateTime(date);
      }
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => {
        return (
          <div className="flex gap-5">
            <Pen className="cursor-pointer text-yellow-700" size={16} onClick={() => navigate(`/admin/events/edit/${record._id}`)} />
            <Trash2 className="cursor-pointer text-red-700" size={16} onClick={() => handleDeleteEvent(record._id)}/>
          </div>
        );
      }
    }
  ];

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <LoadingSpinner />
    </div>;
  }


  return (
    <div className="flex flex-col gap-5 mt-5 mx-5">
      <div className="flex justify-between items-center">
        <PageTitle title="Events" />
        <Button type="primary" onClick={() => navigate("/admin/events/create")}>
          Create
        </Button>
      </div>
      <Table dataSource={eventData} columns={columns} rowKey={(record) => record._id}/>
    </div>
  );
}

export default EventPage;
