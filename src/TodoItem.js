import React from 'react'; 
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
 
function TodoItem({ todo, onToggle, onDelete, categories = [] }) {
  
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

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === parseInt(categoryId));
    return category ? category.name : null;
  };

  const getDueDateInfo = (dueDate) => {
    if (!dueDate) return null;
    
    const due = new Date(dueDate);
    const today = new Date();
    
    due.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return {
        text: `${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''} overdue`,
        variant: 'danger',
        isOverdue: true
      };
    } else if (diffDays === 0) {
      return {
        text: 'Due today',
        variant: 'warning',
        isOverdue: false,
        isDueToday: true
      };
    } else if (diffDays === 1) {
      return {
        text: 'Due tomorrow',
        variant: 'info',
        isOverdue: false
      };
    } else if (diffDays <= 7) {
      return {
        text: `Due in ${diffDays} days`,
        variant: 'info',
        isOverdue: false
      };
    } else {
      return {
        text: `Due in ${diffDays} days`,
        variant: 'secondary',
        isOverdue: false
      };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const priority = getPriorityDisplay(todo.priority);
  const categoryName = getCategoryName(todo.categoryId);
  const dueDateInfo = getDueDateInfo(todo.dueDate);

  const getCardClassName = () => {
    let className = "mb-2 shadow-sm";
    
    if (todo.completed) {
      className += " opacity-75";
    } else if (dueDateInfo?.isOverdue) {
      className += " border-danger";
    } else if (dueDateInfo?.isDueToday) {
      className += " border-warning";
    }
    
    return className;
  };

  return ( 
    <Card className={getCardClassName()}>
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

              {dueDateInfo && (
                <Badge bg={dueDateInfo.variant} pill className="d-flex align-items-center gap-1">
                  {dueDateInfo.isOverdue && '⚠️'}
                  {dueDateInfo.isDueToday && '📅'}
                  <span>{dueDateInfo.text}</span>
                </Badge>
              )}
              
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <span 
                className={todo.completed ? 'text-decoration-line-through text-muted' : ''}
                style={{ fontSize: '1rem', flexGrow: 1 }}
              > 
                {todo.text}
              </span>
              
              {todo.dueDate && (
                <small className="text-muted ms-2">
                  {formatDate(todo.dueDate)}
                </small>
              )}
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