import React, { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Card, Form, Button, Container, Table } from "react-bootstrap";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  bulkUploadReceipts,
  resetFinanceState,
} from "../../features/finance/receiptSlice";
import Message from "../../components/Message";
import { djangoUrl } from "../../features/utils";

const UploadReceipt: React.FC = () => {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);

  const {
    loading,
    successBulkUpload,
    uploadError,
    uploadMessage,
    notCreatedReceipts,
    skippedReceipts,
  } = useAppSelector((state) => state.getReceipts);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Select an Excel file first.");
    const formData = new FormData();
    formData.append("file", file);
    dispatch(bulkUploadReceipts(formData));
  };
  useEffect(() => {
    if (successBulkUpload) {
      setFile(null);
      dispatch(resetFinanceState());
    }
  }, [dispatch, successBulkUpload]);

  return (
    <Container className="mt-4">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/finance/receipts">Receipts</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Upload Receipts</Breadcrumb.Item>
      </Breadcrumb>

      <Button
        variant="outline-success"
        href={`${djangoUrl}/api/finance/receipts/template/`}
        className="mb-3"
      >
        Download Template
      </Button>

      <Card className="shadow">
        <Card.Header className="text-white text-center bg-primary">
          <h5>Bulk Upload Receipts</h5>
        </Card.Header>
        <Card.Body>
          {uploadError && <Message variant="danger">{uploadError}</Message>}
          {uploadMessage && (
            <Message variant="success">{uploadMessage}</Message>
          )}

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="bulkUpload" className="mb-3">
              <Form.Label>Choose Excel File to Upload</Form.Label>
              <Form.Control
                type="file"
                name="file"
                onChange={handleFileChange}
                accept=".xlsx, .xls"
                required
              />
              <Form.Text className="text-muted">
                Supported formats: .xlsx, .xls
              </Form.Text>
            </Form.Group>
            <div className="text-center">
              <Button
                type="submit"
                variant="primary"
                className="w-50"
                disabled={loading}
              >
                {loading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </Form>

          {notCreatedReceipts?.length > 0 && (
            <Card className="mt-4">
              <Card.Header className="bg-danger text-white">
                <h6>{notCreatedReceipts?.length} Receipts Failed</h6>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Description</th>
                      <th>EFD Amount</th>
                      <th>Amount</th>
                      <th>Error</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notCreatedReceipts?.map((r, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{r.description}</td>
                        <td>{r.efd_amount}</td>
                        <td>{r.amount}</td>
                        <td>{r.error}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          )}

          {skippedReceipts?.length > 0 && (
            <Card className="mt-4">
              <Card.Header className="bg-warning text-white">
                <h6>{skippedReceipts?.length} Receipts Skipped</h6>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Receipt Number</th>
                      <th>Payer</th>
                      <th>Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skippedReceipts?.map((r, i) => (
                      <tr key={i}>
                        <td>{r.receipt_number}</td>
                        <td>{r.payer}</td>
                        <td>{r.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UploadReceipt;
