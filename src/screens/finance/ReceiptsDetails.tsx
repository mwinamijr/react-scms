import React, { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { receiptDetails } from "../../features/finance/receiptSlice";
import type { RootState } from "../../app/store";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Breadcrumb, Button, Space } from "antd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ReceiptDetailsPrint: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { loading, error, receipt } = useAppSelector(
    (state: RootState) => state.getReceipts
  );

  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      dispatch(receiptDetails(Number(id)));
    }
  }, [dispatch, id]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    const input = receiptRef.current;
    if (input) {
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [80, canvas.height / 4.5], // match 80mm width and auto height
      });

      pdf.addImage(imgData, "PNG", 0, 0, 80, 0); // auto height
      pdf.save(`receipt-${receipt?.student_details?.full_name || "print"}.pdf`);
    }
  };

  return (
    <div className="container">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/finance/receipts/">Receipts</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Receipt Details</Breadcrumb.Item>
      </Breadcrumb>

      <Space style={{ margin: "16px 0" }} className="no-print">
        <Button type="primary" onClick={handlePrint}>
          🖨️ Print
        </Button>
        <Button onClick={handleDownloadPDF}>📄 Download PDF</Button>
      </Space>

      <div className="receipt-container">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className="receipt" ref={receiptRef}>
            <div className="header">
              <h4>Hayatul Islamiya Secondary</h4>
              <p>P.O. Box 507, Babati - Manyara</p>
              <p>Phone: 0788 030052 / 0752 506523</p>
              <p>
                A/C: NMB: 40702300280, NBC: 072137000011, CRDB: 0150684295500
              </p>
              <hr />
            </div>

            <h5 className="text-center">PAYMENT RECEIPT</h5>

            <div className="details">
              <div>
                <strong>Date:</strong> {receipt?.date}
              </div>
              <div>
                <strong>Slip Ref:</strong> {receipt?.used_slip_details.slip_ref}
              </div>
              <div>
                <strong>Receipt No:</strong> {receipt?.receipt_number}
              </div>
              <div>
                <strong>Payer:</strong> {receipt?.payer}
              </div>
              <div>
                <strong>Student:</strong> {receipt?.student_details?.full_name}
              </div>
              <div>
                <strong>Paid For:</strong> {receipt?.paid_for_details?.name}
              </div>
              <div>
                <strong>Paid Through:</strong>{" "}
                {receipt?.used_slip_details.paid_through}
              </div>
              <div>
                <strong>Paid On:</strong>{" "}
                {receipt?.used_slip_details.payment_date}
              </div>
              <div>
                <strong>Term:</strong> {receipt?.term_details?.name} -{" "}
                {receipt?.term_details?.academic_year_name}
              </div>
              <div>
                <strong>Amount:</strong> {receipt?.amount} TZS
              </div>
              <div>
                <strong>Received By:</strong>{" "}
                {receipt?.received_by_details?.first_name}{" "}
                {receipt?.received_by_details?.last_name}
              </div>
            </div>

            <hr />
            <p className="text-center">Thank you!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiptDetailsPrint;
