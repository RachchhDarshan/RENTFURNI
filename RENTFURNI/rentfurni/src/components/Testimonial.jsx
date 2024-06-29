import React from 'react'
import { Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import image from '../assets/pexels-lina-1813502.jpg'

const Testimonial = () => {
    return (
        <>
            <div style={{paddingTop:"78px"}} >
                <Container >
                    <Row className='d-flex align-items-center'>
                        <Col>
                            <img src={image} alt="" className='w-75' style={{ height: "600px" }} />
                        </Col>
                        <Col>
                            <div className='text-end fs-2'>
                                Weekly Sale on 60% Off All Products
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Testimonial