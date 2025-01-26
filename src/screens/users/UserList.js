import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, Table, Row, Col, Form, Button } from "react-bootstrap";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {
  listUsers,
  deleteUser,
  resetSuccessDelete,
} from "./../../features/user/userSlice"; // Updated import
import Loader from "./../../components/Loader";
import Message from "./../../components/Message";

function UserList() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [filters, setFilters] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const { loading, error, users, successDelete, pagination } = useSelector(
    (state) => state.getUsers
  ); // Using the user slice state

  useEffect(() => {
    dispatch(listUsers({ ...filters, page: currentPage }));

    if (successDelete) {
      dispatch(resetSuccessDelete());
    }
  }, [dispatch, successDelete, filters, currentPage]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to the first page on search
    dispatch(listUsers({ ...filters, page: 1 }));
  };

  // Handlers for pagination
  const handleNextPage = () => {
    if (pagination.next) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pagination.previous) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Users</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <h1 className="text-center">Users</h1>
        <Row>
          <Col>
            <Link to="/users/add" className="btn btn-light my-3">
              Add User
            </Link>
          </Col>
        </Row>

        <Form onSubmit={handleSearch} className="mb-3">
          <Row>
            <Col md={4}>
              <Form.Control
                type="text"
                name="first_name"
                placeholder="First Name"
                value={filters.first_name}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={filters.last_name}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                name="email"
                placeholder="Email"
                value={filters.email}
                onChange={handleInputChange}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <Button type="submit" variant="primary" className="w-100">
                Search
              </Button>
            </Col>
          </Row>
        </Form>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Adm No:</th>
                  <th>Full Name or Email</th>
                  <th>Ad</th>
                  <th>Tea</th>
                  <th>Acc</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.empId}</td>
                    <td>
                      {user.email
                        ? user.email
                        : user.first_name + user.last_name}
                    </td>
                    <td>
                      {user.isAdmin ? <CheckOutlined /> : <CloseOutlined />}
                    </td>
                    <td>
                      {user.isTeacher ? <CheckOutlined /> : <CloseOutlined />}
                    </td>
                    <td>
                      {user.isAccountant ? (
                        <CheckOutlined />
                      ) : (
                        <CloseOutlined />
                      )}
                    </td>
                    <td>
                      <Link to={`/users/${user.id}`}>
                        <EyeOutlined />
                      </Link>
                      <span> </span>
                      <Link to={`/users/${user.id}/edit`}>
                        <EditOutlined />
                      </Link>
                      <span> </span>
                      <DeleteOutlined onClick={() => deleteHandler(user.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <Button
                variant="light"
                onClick={handlePreviousPage}
                disabled={!pagination.previous}
              >
                Previous
              </Button>
              <span>
                Page {currentPage} of {Math.ceil(pagination.count / 30)}{" "}
                {/* Assuming default page size is 30 */}
              </span>
              <Button
                variant="light"
                onClick={handleNextPage}
                disabled={!pagination.next}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserList;
