import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';

export default function Confirmation() {
    const location = useLocation();
    const { orderId } = location.state || {}
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const date = new Date();
    let day : string = date.getDay().toString();

  return (
    <div className="container mt-5">
      <Container maxWidth="sm" className="text-center">
        <Typography variant="h3" className="mb-4">
          Thank You for Your Purchase!
        </Typography>
        <Typography variant="h6" className="mb-3">
          Your order has been successfully placed.
        </Typography>
        <Typography variant="body1" className="mb-4">
          We appreciate your business and hope you enjoy your new items. A confirmation email has been sent to you with the details of your order.
        </Typography>

        {/* Order summary or additional details could go here */}
        <div className="row mb-4">
          <div className="col-md-6">
            <Typography variant="body2">
              <strong>Order Number:</strong> #{orderId}
            </Typography>
          </div>
          <div className="col-md-6">
            <Typography variant="body2">
              <strong>Order Date:</strong> {months[new Date().getMonth()]} {date.getDate()} 
            </Typography>
          </div>
        </div>

        {/* Thank You Message and Button */}
        <div className="mt-4">
          <Button
            variant="contained"
            color="primary"
            className="me-2"
          >
            Continue Shopping
          </Button>
          <Button
            variant="outlined"
            color="secondary"
          >
            View Order Details
          </Button>
        </div>
      </Container>
    </div>
  );
}
