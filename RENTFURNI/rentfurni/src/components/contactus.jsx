import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const ContactUs = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!form.name || !form.email || !form.subject || !form.message) {
      setError('Please fill out all fields');
      return;
    }

    // Simulate form submission
    console.log('Form submitted:', form);
    setSubmitted(true);
    setError('');
    setForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <div className="text-center mb-4">
            <h2>Contact RentFurni</h2>
            <p>Your one-stop solution for furniture rentals</p>
          </div>
          {submitted && <Alert variant="success">Your message has been sent successfully!</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </Form.Group>
            <Form.Group controlId="formSubject" className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Enter the subject"
              />
            </Form.Group>
            <Form.Group controlId="formMessage" className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="Enter your message"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Form>
          <div className="mt-5">
            <h4>Contact Information</h4>
            <p>Email: rentfurni2325@rentfurni.com</p>
            <p>Phone: 9408216169</p>
            <p>Address: Ahmedabad,FN 45678</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
