import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Row, Col, Card } from "antd";

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      setDeferredPrompt(null);
    }
  };

  return (
    <div style={{ padding: "16px" }}>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card>
            <Title level={2} className="text-center">
              Hayatul Islamiya School Management System
            </Title>
            <Paragraph className="text-center">
              Huu ni mfumo wa uendeshaji na utoaji wa taarifa mbalimbali
              zinazohusu shule na uendeshaji. Mfumo huu unatumika na walimu wa
              shule hii kupata na kuhifadhi taarifa za maendeleo ya shule na
              wanafunzi. Pia ni kiunganisha kati ya shule na wazazi katika kutoa
              na kupata taarifa za maendeleo ya wanafunzi moja kwa moja.
            </Paragraph>
            <div style={{ textAlign: "center" }}>
              <Button type="primary" size="large">
                <Link to="/login">Ingia</Link>
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} justify="center" className="mt-5">
        <Col xs={24} md={12}>
          <Card>
            <Title level={3} className="text-center">
              Namna ya kutumia mfumo huu
            </Title>
            <Paragraph>
              Soma maelekezo ya kutumia mfumo huu kulingana na aina ya mtumiaji.
            </Paragraph>
            <ul>
              <li>
                <Link to="/getting-started/teachers">Walimu</Link>
              </li>
              <li>
                <Link to="/getting-started/parents">Wazazi</Link>
              </li>
              <li>
                <Link to="/getting-started/developers">Developers</Link>
              </li>
            </ul>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <Title level={3} className="text-center">
              Developers
            </Title>
            <Paragraph>
              All developers are welcome to join this open-source project. This
              project gives opportunities to developers with JavaScript, React,
              and Redux skills to contribute and help build the platform.
            </Paragraph>
            <ul>
              <li>
                <a
                  href="https://github.com/mwinamijr/react-scms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  React School Management System - Github Repository
                </a>
              </li>
              <li>
                For instructions on contributing, check the{" "}
                <Link to="/getting-started/developers">developers manual</Link>.
              </li>
            </ul>
          </Card>
        </Col>
      </Row>

      {deferredPrompt && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button type="primary" onClick={handleInstall}>
            Install App
          </Button>
        </div>
      )}

      <footer style={{ textAlign: "center", marginTop: "40px" }}>
        Hayatul Islamiya © 2022 - {new Date().getFullYear()} Created by
        Techdometz
      </footer>
    </div>
  );
};

export default Home;

// Type declaration for BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice?: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}
