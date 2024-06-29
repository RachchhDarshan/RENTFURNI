import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Typography, Card, CardContent, CardActions, CardMedia } from '@mui/material';

// Simulate cart data
const initialCart = {
  total_unique_items: 2,
  line_items: [
    {
      id: 'item1',
      name: 'Chair',
      quantity: 1,
      media: { source: 'https://via.placeholder.com/50' },
      line_total: { formatted_with_symbol: '$50' }
    },
    {
      id: 'item2',
      name: 'Table',
      quantity: 1,
      media: { source: 'https://via.placeholder.com/50' },
      line_total: { formatted_with_symbol: '$150' }
    }
  ],
  subtotal: { formatted_with_symbol: '$200' }
};

// Recommended product data
const recommendedProductData = {
  id: 'item3',
  name: 'Sofa',
  media: { source: 'https://via.placeholder.com/50' },
  price: { formatted_with_symbol: '$300' }
};

// Cart Component
const Cart = () => {
  const [cart, setCart] = useState(initialCart);
  const [recommendedProduct, setRecommendedProduct] = useState(recommendedProductData);

  const addProductToCart = (productId) => {
    setCart((prevCart) => {
      const newProduct = {
        id: productId,
        name: 'Sofa',
        quantity: 1,
        media: { source: 'https://via.placeholder.com/50' },
        line_total: { formatted_with_symbol: '$300' }
      };
      return {
        ...prevCart,
        total_unique_items: prevCart.total_unique_items + 1,
        line_items: [...prevCart.line_items, newProduct],
        subtotal: { formatted_with_symbol: '$500' }
      };
    });
  };

  return (
    <Container className="cart">
      {cart.total_unique_items > 0 ? (
        <>
          <CartProductList cart={cart} />
          <CartTotalRow cart={cart} />
          <RecommendedProduct recommendedProduct={recommendedProduct} addProductToCart={addProductToCart} />
          <CartCheckoutRow />
        </>
      ) : (
        <p>Your cart is currently empty.</p>
      )}
    </Container>
  );
}

// CartProductList Component
const CartProductList = ({ cart }) => {
  return (
    cart.line_items.map(lineItem => {
      return <CartProductRow key={lineItem.id} lineItem={lineItem} />
    })
  );
}

// CartProductRow Component
const CartProductRow = ({ lineItem }) => {
  return (
    <Card className="mb-2">
      <CardContent>
        <Row className="align-items-center">
          <Col md={2}>
            <CardMedia
              component="img"
              src={lineItem.media.source}
              alt={lineItem.name}
              height="50"
            />
          </Col>
          <Col md={6}>
            <Typography variant="h6">{lineItem.name}</Typography>
          </Col>
          <Col md={2}>
            <Typography>{lineItem.quantity}</Typography>
          </Col>
          <Col md={2}>
            <Typography>{lineItem.line_total.formatted_with_symbol}</Typography>
          </Col>
        </Row>
      </CardContent>
    </Card>
  );
}

// CartTotalRow Component
const CartTotalRow = ({ cart }) => {
  return (
    <Row>
      <Col md={12} className="text-right">
        <Typography variant="h6">Total: {cart.subtotal.formatted_with_symbol}</Typography>
      </Col>
    </Row>
  );
}

// CartCheckoutRow Component
const CartCheckoutRow = () => {
  return (
    <Row>
      <Col md={12} className="text-right">
        <Button variant="success">
          Checkout
        </Button>
      </Col>
    </Row>
  );
}

// RecommendedProduct Component
const RecommendedProduct = ({ recommendedProduct, addProductToCart }) => {
  const handleAddProduct = () => {
    addProductToCart(recommendedProduct.id);
  }

  return (
    <Card className="mb-3">
      <CardContent>
        <Row className="align-items-center">
          <Col md={2}>
            <CardMedia
              component="img"
              src={recommendedProduct.media.source}
              alt={recommendedProduct.name}
              height="50"
            />
          </Col>
          <Col md={6}>
            <Typography variant="h6">{recommendedProduct.name}</Typography>
          </Col>
          <Col md={2}>
            <Typography>{recommendedProduct.price.formatted_with_symbol}</Typography>
          </Col>
          <Col md={2}>
            <CardActions>
              <Button variant="success" onClick={handleAddProduct} size="small">
                Add
              </Button>
            </CardActions>
          </Col>
        </Row>
      </CardContent>
    </Card>
  );
}

export default Cart;
