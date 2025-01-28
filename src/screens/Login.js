import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Typography,
  Alert,
  Spin,
  Row,
  Col,
  Card,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/user/userSlice";

const { Title } = Typography;

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.getUsers);
  const { error, loading, userInfo } = user;

  useEffect(() => {
    if (userInfo) {
      return <Navigate replace to="/dashboard" />;
    }
  }, [userInfo]);

  const submitHandler = () => {
    dispatch(login({ email, password }));
  };

  return (
    <div style={{ padding: "16px" }}>
      <Row justify="center">
        <Col xs={24} sm={20} md={12} lg={8}>
          <Card>
            <Title level={2} className="text-center">
              Sign In
            </Title>
            {error && <Alert message={error} type="error" showIcon />}
            {loading && (
              <Spin
                size="large"
                style={{ margin: "20px auto", display: "block" }}
              />
            )}

            <Form
              layout="vertical"
              onFinish={submitHandler}
              style={{ marginTop: "20px" }}
            >
              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                ]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Sign In
                </Button>
              </Form.Item>
            </Form>

            <Typography.Text>
              New here? <Link to="/register">Register Now</Link>
            </Typography.Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default LoginScreen;
