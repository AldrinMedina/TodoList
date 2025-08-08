import React, { useState } from 'react'; 
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function AddCategories({ onAddCategory }) { 
  const [inputText, setInputText] = useState(''); 
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setInputText(''); // Clear input when closing
  };
  
  const handleShow = () => setShow(true);
 
  const handleSubmit = (e) => { 
    e.preventDefault(); 
    if (inputText.trim() !== '') { 
      onAddCategory(inputText.trim()); 
      setInputText(''); 
      handleClose(); // Close modal after adding
    } 
  }; 
 
  return ( 
    <>
      <Button variant='outline-success' size='sm' onClick={handleShow} className="mb-3">
        Add Category
      </Button>
      
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Category Name</Form.Label>
              <Form.Control 
                type="text" 
                value={inputText} 
                onChange={(e) => setInputText(e.target.value)} 
                placeholder="Enter category name"
                autoFocus
              />
            </Form.Group>
          </Modal.Body>
          
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={!inputText.trim()}>
              Add Category
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  ); 
} 

export default AddCategories;