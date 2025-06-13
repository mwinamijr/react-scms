import React, { useState, useEffect, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Button, Breadcrumb, Form } from "react-bootstrap";
import axios from "axios";

import { listStudents } from "../../redux/actions/studentActions";
import { listUsers } from "./../../redux/actions/userActions";
import { RootState, AppDispatch } from "../../redux/store"; // update to your actual paths/types
import { StudentType } from "../../types/studentTypes"; // optional: define type with id, parentContact
import { UserType } from "../../types/userTypes"; // optional: define type with id, phone

const Sms: React.FC = () => {
  const [sendTo, setSendTo] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const nodeUrl = "http://localhost:4001";

  const dispatch = useDispatch<AppDispatch>();

  const studentList = useSelector((state: RootState) => state.studentList);
  const { studentLoading, students } = studentList;

  const userList = useSelector((state: RootState) => state.userList);
  const { userLoading, users } = userList;

  const employees: string[] = [];
  const parents: string[] = [];

  if (!userLoading && users) {
    for (const user of users as UserType[]) {
      employees.push(user.phone);
    }
  }

  if (!studentLoading && students) {
    for (const student of students as StudentType[]) {
      parents.push(student.parentContact);
    }
  }

  useEffect(() => {
    dispatch(listStudents());
    dispatch(listUsers());
  }, [dispatch]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data =
        sendTo === "parents" ? { parents, message } : { employees, message };

      await axios.post(`${nodeUrl}/api/notification/sms/send`, data);
      alert("Message sent successfully!");
    } catch (error) {
      console.error("SMS send error:", error);
      alert("Failed to send message.");
    }
  };

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Send SMS</Breadcrumb.Item>
      </Breadcrumb>

      <Card>
        <Card.Header className="text-center" style={{ fontSize: "24px" }}>
          Send SMS
        </Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label>Send To</Form.Label>
              <Form.Select
                id="sendTo"
                value={sendTo}
                onChange={(e) => setSendTo(e.target.value)}
              >
                <option value="">Select who you want to send message</option>
                <option value="teachers">Teachers</option>
                <option value="parents">Parents</option>
              </Form.Select>
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                id="message"
                placeholder="Enter your message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Button className="primary" type="submit">
                Send SMS
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Sms;
