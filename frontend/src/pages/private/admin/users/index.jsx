import { useState, useEffect } from "react";
import { message, Table } from "antd";
import { getAllUsers, updateUserData } from "../../../../api-services/users-service";
import PageTitle from "../../../../components/events-page-title";
import LoadingSpinner from "../../../../components/loading-spinner";
import { formatDate } from "../../../../utils/dateformatter";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState([]);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (e) {
      message.error(e.response.data.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (data) => {
    try {
        setLoading(true);
        updateUserData(data);
        message.success("User updated successfully");
        getData();
    } catch (error) {
        message.error(error.response.data.message || error.message)
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <LoadingSpinner />;

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Joined At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => formatDate(createdAt),
    },
    {
        title: 'Role',
        dataIndex: 'isAdmin',
        key: 'isAdmin', 
        render: (isAdmin, row) => {
            return <select value={isAdmin ? 'admin':'user'} 
            onChange={(e)=> {
                const isAdminUpdated = e.target.value === 'admin';
                updateUser({userId: row._id, isAdmin: isAdminUpdated});
            }}
            className="border border-solid border-gray-600">
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
        }
    }
  ];

  return (
    <div className="mt-5 mx-5">
      <PageTitle title="Users" />
      <Table dataSource={users} columns={columns} loading={loading} rowKey="_id"/>
    </div>
  );
}

export default UsersPage;
