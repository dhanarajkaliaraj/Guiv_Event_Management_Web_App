import React, { useEffect, useState } from "react";
import PageTitle from "../../../../components/events-page-title";
import { message, Table  } from "antd";
import { getAllBookings } from "../../../../api-services/booking-service";
import { formatDateTime } from "../../../../utils/dateformatter";

function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState([]);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getAllBookings();
      setBookings(response.data);
    } catch (e) {
      message.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
        title: "Event",
        dataIndex: "event",
        key: "event",
        render: (event) => event.name,
    },
    {
        title: "User",
        dataIndex: "user",
        key: "user",
        render: (event) => event.name,
    },
    {
        title: "Event Date & Time",
        dataIndex: "event",
        key: "event",
        render: (event) => formatDateTime(`${event.date} ${event.time}`),
    },
    {
        title: "Ticket Type",
        dataIndex: "ticketType",
        key: "ticketType",
    },
    {
        title: "Tickets Count",
        dataIndex: "ticketsCount",
        key: "ticketsCount",
    },
    {
        title: "Total Amount",
        dataIndex: "totalAmount",
        key: "totalAmount",
    },
    {
        title: 'Blocked On',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (createdAt) => formatDateTime(createdAt),
    }
  ]

  return <div className="mt-5 mx-5">
      <PageTitle title="Bookings" />
      <Table 
        dataSource={bookings}
        columns={columns}
        loading={loading}
        rowKey="_id"
        pagination={false}
      />
  </div>
}

export default AdminBookingsPage;
