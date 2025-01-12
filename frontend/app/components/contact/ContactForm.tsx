'use client';
import { useState } from 'react';
import { contactAPI } from '@/app/service/API';
import { Alert, Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<{
        type: 'success' | 'error' | '';
        message: string;
    }>({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        const response = await contactAPI.submit(formData);
        
        if (response.success) {
            setStatus({ type: 'success', message: 'Message sent successfully!' });
            setFormData({ name: '', email: '', message: '' });
        } else {
            setStatus({ type: 'error', message: response.error || 'Failed to send message' });
        }
        
        setLoading(false);
    };

    return (
        <Container fluid className="bg-light py-5">
            <Container>
                <Row className="justify-content-center">
                    <Col md={10} lg={8}>
                        <Card className="border-0 shadow-lg">
                            <Card.Body className="p-4 p-md-5">
                                <Row className="mb-4">
                                    <Col>
                                        <h2 className="text-center fw-bold mb-3">Contact Us</h2>
                                        <p className="text-center text-muted mb-4">
                                            Have questions? We'd love to hear from you.
                                        </p>
                                    </Col>
                                </Row>

                                <Row className="mb-4">
                                    <Col md={4} className="mb-3 mb-md-0">
                                        <div className="text-center">
                                            <FaEnvelope className="text-primary mb-2" size={24} />
                                            <h6 className="fw-bold">Email</h6>
                                            <p className="text-muted small">contact@best2.com</p>
                                        </div>
                                    </Col>
                                    <Col md={4} className="mb-3 mb-md-0">
                                        <div className="text-center">
                                            <FaPhone className="text-primary mb-2" size={24} />
                                            <h6 className="fw-bold">Phone</h6>
                                            <p className="text-muted small">+383 49 100 100</p>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className="text-center">
                                            <FaMapMarkerAlt className="text-primary mb-2" size={24} />
                                            <h6 className="fw-bold">Address</h6>
                                            <p className="text-muted small">Kodrali City, Kosovo</p>
                                        </div>
                                    </Col>
                                </Row>

                                {status.message && (
                                    <Alert 
                                        variant={status.type === 'success' ? 'success' : 'danger'}
                                        className="mb-4"
                                    >
                                        {status.message}
                                    </Alert>
                                )}

                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md={6} className="mb-3">
                                            <Form.Group>
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="Enter your name"
                                                    required
                                                    className="shadow-none"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6} className="mb-3">
                                            <Form.Group>
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="Enter your email"
                                                    required
                                                    className="shadow-none"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Message</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            name="message"
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Enter your message"
                                            required
                                            className="shadow-none"
                                        />
                                    </Form.Group>

                                    <div className="d-grid">
                                        <Button 
                                            type="submit"
                                            size="lg"
                                            className="text-white"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span 
                                                        className="spinner-border spinner-border-sm me-2" 
                                                        role="status" 
                                                        aria-hidden="true"
                                                    />
                                                    Sending...
                                                </>
                                            ) : 'Send Message'}
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default ContactForm;
