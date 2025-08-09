import React, { useState } from 'react'; 
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
 
function CategoryItem({categories = [], onDelete, onReset}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return ( 
    <>
        <Button variant='outline-success' size='sm' onClick={handleShow} className="mb-3 me-2">
            Categories
        </Button>
        <Modal show={show} onHide={handleClose} animation={false} size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Categories</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {categories.map(category => (
                    <Card key={category.id} className= 'mb-2 shadow-sm'>
                        <Card.Body className="py-2">
                            <Row className="align-items-center">
                                <Col>
                                    <span>{category.name}</span>
                                </Col>
                                <Col xs="auto">
                                    <Button  
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => onDelete(category.id)}
                                    > 
                                    Delete 
                                    </Button> 
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                ))}
            </Modal.Body>
            {/* <Modal.Footer>
                <Button variant='outline-danger' size='sm' onClick={() => onReset()}>
                    Delete All
                </Button>
            </Modal.Footer> */}
        </Modal>
    </>
    
  ); 
} 
 
export default CategoryItem;