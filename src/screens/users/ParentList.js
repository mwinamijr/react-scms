import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, Table, Row, Col, Form, Button } from "react-bootstrap";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  listParents,
  deleteParent,
  resetSuccessDelete,
} from "./../../features/user/parentSlice"; // Updated import
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

  const { loading, error, parents, successDelete, pagination } = useSelector(
    (state) => state.getParents
  ); // Using the parent slice state

  useEffect(() => {
    dispatch(listParents({ ...filters, page: currentPage }));

    if (successDelete) {
      dispatch(resetSuccessDelete());
    }
  }, [dispatch, successDelete, filters, currentPage]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteParent(id));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to the first page on search
    dispatch(listParents({ ...filters, page: 1 }));
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
        <Breadcrumb.Item active>Parents</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <h1 className="text-center">Parents</h1>

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
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {parents.map((parent) => (
                  <tr key={parent.id}>
                    <td>{parent.empId}</td>
                    <td>
                      {parent.first_name} {parent.last_name}
                    </td>
                    <td>{parent.email}</td>
                    <td>
                      <Link to={`/users/parents/${parent.id}`}>
                        <EyeOutlined />
                      </Link>
                      <span> </span>
                      <Link to={`/users/parents/${parent.id}/edit`}>
                        <EditOutlined />
                      </Link>
                      <span> </span>
                      <DeleteOutlined
                        onClick={() => deleteHandler(parent.id)}
                      />
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
