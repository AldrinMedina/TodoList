import React, { useState } from 'react'; 
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
 
function AddTodoForm({ onAddTodo, categories = [] }) { 
  const [inputText, setInputText] = useState(''); 
  const [priority, setPriority] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    // Reset form fields when closing
    setInputText('');
    setPriority('');
    setCategoryId('');
  };
  
  const handleShow = () => setShow(true);
 
  const handleSubmit = (e) => { 
    e.preventDefault(); 
    if (inputText.trim() !== '' && priority.trim() !== '') { 
      onAddTodo(inputText.trim(), priority, categoryId || null); 
      // Reset form fields
      setInputText(''); 
      setPriority('');
      setCategoryId('');
      handleClose();
    } 
  }; 
 
  return ( 
    <>
      <Button variant='outline-success' size='sm' onClick={handleShow} className="mb-3 me-2">
        Add New TODO
      </Button>
      
      <Modal show={show} onHide={handleClose} animation={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New TODO</Modal.Title>
        </Modal.Header>
        
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>TODO Description</Form.Label>
              <Form.Control 
                type="text" 
                value={inputText} 
                onChange={(e) => setInputText(e.target.value)} 
                placeholder="Enter a new TODO..." 
                autoFocus
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Priority</Form.Label>
                  <Form.Select 
                    value={priority} 
                    onChange={(e) => setPriority(e.target.value)}
                    required
                  >
                    <option value="">Select Priority</option>
                    <option value="1">High</option>
                    <option value="2">Medium</option>
                    <option value="3">Low</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category (Optional)</Form.Label>
                  <Form.Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                    <option value="">No Category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {categories.length === 0 && (
              <Form.Text className="text-muted">
                💡 Tip: Add categories first to organize your TODOs better!
              </Form.Text>
            )}
          </Modal.Body>
          
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              type="submit" 
              disabled={!inputText.trim() || !priority.trim()}
            >
              Add TODO
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  ); 
} 
 
export default AddTodoForm;