import React from 'react'; 
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
 
function TodoItem({ todo, onToggle, onDelete, categories = [] }) {
  
  // Priority display helper
  const getPriorityDisplay = (priority) => {
    switch(priority) {
      case 1:
        return { text: 'High', variant: 'danger' };
      case 2:
        return { text: 'Medium', variant: 'warning' };
      case 3:
        return { text: 'Low', variant: 'success' };
      default:
        return { text: 'None', variant: 'secondary' };
    }
  };

  // Find category name
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === parseInt(categoryId));
    return category ? category.name : null;
  };

  const priority = getPriorityDisplay(todo.priority);
  const categoryName = getCategoryName(todo.categoryId);
    
  return ( 
    <Card className="mb-2 shadow-sm">
      <Card.Body className="py-2">
        <Row className="align-items-center">
          <Col xs="auto">
            <Form.Check
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className="me-2"
            />
          </Col>
          
          <Col>
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <Badge bg={priority.variant} className="d-flex align-items-center gap-1">
                <span>{priority.text}</span>
              </Badge>
              
              {categoryName && (
                <Badge bg="info" pill>
                  {categoryName}
                </Badge>
              )}
              
              <span 
                className={todo.completed ? 'text-decoration-line-through text-muted' : ''}
                style={{ fontSize: '1rem', flexGrow: 1 }}
              > 
                {todo.text}
              </span>
            </div>
          </Col>
          
          <Col xs="auto">
            <Button  
              variant="outline-danger"
              size="sm"
              onClick={() => onDelete(todo.id)}
            > 
              Delete 
            </Button> 
          </Col>
        </Row>
      </Card.Body>
    </Card>
  ); 
} 
 
export default TodoItem;