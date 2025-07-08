import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Table } from "react-bootstrap";
import { Breadcrumb } from "antd";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { receiptDetails } from "../../features/finance/financeSlice";
import type { RootState } from "../../app/store";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

// Define receipt type
interface ReceiptDetails {
  id: number;
  date: string;
  receipt_number: string;
  payer: string;
  paid_through: string;
  amount: number;
  student_details: {
    full_name: string;
  };
  paid_for_details: {
    name: string;
  };
  term?: {
    name: string;
    academic_year_name: string;
  };
  received_by_details: {
    first_name: string;
    last_name: string;
  };
}

const ReceiptsDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const { loading, error, receipt } = useAppSelector(
    (state: RootState) => state.getFinance
  );
  console.log("Receipt Details:", receipt);

  useEffect(() => {
    if (id) {
      dispatch(receiptDetails(Number(id)));
    }
  }, [dispatch, id]);

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/finance/receipts/">Receipts</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Receipt Details</Breadcrumb.Item>
      </Breadcrumb>

      <div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className="p-4 p-md-5 mb-4 text-black rounded bg-light">
            <Card>
              <Card.Header className="text-center">
                <div className="receipt-bg">
                  <h3>
                    Hayatul Islamiya Secondary <br />
                    P.O. Box 507, Babati - Manyara; <br />
                    Phone: 0788 030052, 0752 506523 <br />
                    A/C Number:- NMB: , NBC:, CRDB:
                  </h3>
                </div>
              </Card.Header>
              <Card.Body className="text-left col-md-8">
                <Card.Title className="pb-3">PAYMENT RECEIPT</Card.Title>
                <Table>
                  <tbody>
                    <tr>
                      <td>Date</td>
                      <td>{receipt?.date}</td>
                      <td>Receipt number</td>
                      <td>{receipt?.receipt_number}</td>
                    </tr>
                    <tr>
                      <td>Payer</td>
                      <td>{receipt?.payer}</td>
                    </tr>
                    <tr>
                      <td>Student</td>
                      <td>{receipt?.student_details?.full_name}</td>
                    </tr>
                    <tr>
                      <td>Paid for</td>
                      <td>{receipt?.paid_for_details?.name}</td>
                    </tr>
                    <tr>
                      <td>Paid through</td>
                      <td>{receipt?.paid_through}</td>
                    </tr>
                    <tr>
                      <td>Term</td>
                      <td>
                        {receipt?.term_details?.name} -{" "}
                        {receipt?.term_details?.academic_year_name}
                      </td>
                    </tr>
                    <tr>
                      <td>Amount</td>
                      <td>{receipt?.amount}</td>
                    </tr>
                    <tr>
                      <td>Received by</td>
                      <td>
                        {receipt?.received_by_details?.first_name}{" "}
                        {receipt?.received_by_details?.last_name}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiptsDetails;
