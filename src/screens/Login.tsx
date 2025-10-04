import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Layout,
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  Divider,
  Spin,
  message,
} from "antd";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { login } from "../features/user/userSlice";
import AuthFooter from "../components/AuthFooter";
import logo from "../assets/hayatul-logo.svg";
import type { RootState } from "../app/store";
import { useAppDispatch } from "../app/hooks";

const { Title, Text } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { error, loading, userInfo } = useSelector(
    (state: RootState) => state.getUsers
  );

  const [form] = Form.useForm();

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [userInfo, navigate]);

  const handleLogin = (values: LoginFormValues) => {
    dispatch(login({ email: values.email, password: values.password }));
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Row justify="center" style={{ width: "100%" }}>
        <Col xs={22} sm={18} md={12} lg={8}>
          <Card bordered style={{ padding: "24px", textAlign: "center" }}>
            {/* Logo */}
            <div onClick={() => (window.location.href = "#")}>
              <img
                src={logo}
                alt="techdometz"
                style={{ height: 50, marginRight: 10 }}
              />
            </div>

            <Title level={2} style={{ marginTop: "16px" }}>
              Hi, Welcome Back
            </Title>
            <Text type="secondary">
              Enter your credentials to continue <br />
            </Text>

            {error && <Text type="danger">{error}</Text>}

            <Form
              form={form}
              layout="vertical"
              onFinish={handleLogin}
              style={{ marginTop: "24px" }}
            >
              <Form.Item
                label="Email Address"
                name="email"
                rules={[{ required: true, message: "Please enter your email" }]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  iconRender={(visible) =>
                    visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <Row justify="space-between">
                <Col>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox defaultChecked>Remember me</Checkbox>
                  </Form.Item>
                </Col>
                <Col>
                  <Link to="/forgot-password">Forgot Password?</Link>
                </Col>
              </Row>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  disabled={loading}
                  icon={
                    loading ? <Spin indicator={<LoadingOutlined />} /> : null
                  }
                >
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </Form.Item>
            </Form>

            <Divider />

            <Text>
              Don't have an account? Contact your employer to get one.
            </Text>
          </Card>

          <AuthFooter />
        </Col>
      </Row>
    </Layout>
  );
};

export default Login;
