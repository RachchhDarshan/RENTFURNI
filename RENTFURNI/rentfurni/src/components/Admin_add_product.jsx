import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'; // Import axios for HTTP requests

const Dashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    available: false, // Assuming available is a boolean
    image: null // This will hold the selected file
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const val = type === 'checkbox' ? checked : value;
    const image = type === 'file' ? files[0] : null;
    setFormData({
      ...formData,
      [name]: val,
      image: image
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('available', formData.available);
      formDataToSend.append('image', formData.image);

      const res = await axios.post('http://localhost:5000/auth/products', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Product added:', res.data.product);
      // Reset form after successful submission if needed
      // setFormData({ name: '', price: '', description: '', available: false, image: null });

    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error state or display an error message to the user
    }
  };

  return (
    <Form className="container" onSubmit={handleSubmit}>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              type="text"
              name="name"
              id='name'
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Row>
            <Col md={{ span: 6, offset: 0 }}>
              <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Control
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Enter Price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={{ span: 6, offset: 0 }}>
              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Price-PerDay</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  id='description'
                  placeholder="Enter Description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              name="available"
              id='available'
              label="Product is available or not"
              checked={formData.available}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control
              type="file"
              name="image"
              id='image'
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Dashboard;
