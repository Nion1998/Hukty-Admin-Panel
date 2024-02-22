import React from "react";
import { Card } from "react-bootstrap";

const DashboardCard = ({ icon, title, number }) => {
  // Destructuring props properly
  return (
    <div>
      <Card className="m-2 shadow">
        <Card.Body className="text-center p-4">
          <div className="fs-1">{icon}</div>
          <div className="fw-bold fs-3">{number}</div>
          <div className="fs-16-600">{title}</div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DashboardCard;
