import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
// import logo from './logo.svg';
import TodoItem from './TodoItem';
import CategoryItem from './CategoryItem';
import AddTodoForm from './AddTodoForm';
import AddCategories from './AddCategories';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]); 
  const [nextId, setNextId] = useState(); 
  const [categories, setCategories] = useState([]); 
  const [nextCategoryId, setNextCategoryId] = useState();
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('priority');

  useEffect(() => { 
    const savedTodos = localStorage.getItem('todos'); 
    const savedCategories = localStorage.getItem('categories');
    const savedNextId = localStorage.getItem('nextId');  
    const savedNextCategoryId = localStorage.getItem('nextCategoryId');
    
    if (savedTodos) { 
      setTodos(JSON.parse(savedTodos)); 
    }
    if (savedNextId) { 
      setNextId(parseInt(savedNextId)); 
    } else {
      setNextId(1);
    }
    if (savedCategories) { 
      setCategories(JSON.parse(savedCategories)); 
    } 
    if (savedNextCategoryId) { 
      setNextCategoryId(parseInt(savedNextCategoryId)); 
    } else {
      setNextCategoryId(1);
    }
  }, []);
 
  useEffect(() => { 
    if (todos.length > 0) { 
      localStorage.setItem('todos', JSON.stringify(todos)); 
    } 
  }, [todos]);

  useEffect(() => { 
    if (nextId > 0){
      localStorage.setItem('nextId', nextId.toString()); 
    }
  }, [nextId]);

  useEffect(() => { 
    if (categories.length >0){
      localStorage.setItem('categories', JSON.stringify(categories)); 
    }
  }, [categories]);

  useEffect(() => { 
    if (nextCategoryId > 0){
      localStorage.setItem('nextCategoryId', nextCategoryId.toString()); 
    }
  }, [nextCategoryId]);

  const filteredTodos = selectedCategoryFilter === 'all' 
    ? todos 
    : todos.filter(todo => {
        const todoCategory = todo.categoryId;
        const filterCategory = selectedCategoryFilter === 'all' ? 'all' : parseInt(selectedCategoryFilter);
        return todoCategory === filterCategory;
      });

  const getSortedTodos = (todosToSort) => {
    return [...todosToSort].sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return a.priority - b.priority;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'priority':
          return a.priority - b.priority;
        default:
          return a.priority - b.priority;
      }
    });
  };


  const addTodo = (text, priority, categoryId, dueDate) => { 
    const newTodo = { 
      id: nextId, 
      text: text, 
      priority: parseInt(priority),
      categoryId: parseInt(categoryId) || null,
      dueDate: dueDate || null,
      completed: false 
    }; 
    setTodos([...todos, newTodo]); 
    setNextId(nextId + 1); 
  };


  const addCategory = (text) => { 
    const newCategory = {
      id: nextCategoryId,
      name: text
    };
    setCategories([...categories, newCategory]); 
    setNextCategoryId(nextCategoryId + 1); 
  };
 
  const toggleTodo = (id) => { 
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo 
    )); 
  }; 
 
  const deleteTodo = (id) => { 
    const updatedTodos = todos.filter(todo => todo.id !== Number(id));
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };
  const deleteCategory = (id) => { 
    const updatedCategories = categories.filter(category => category.id !== Number(id));
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    if (selectedCategoryFilter === id.toString()) {
      setSelectedCategoryFilter('all');
    }
  };

  const resetCategory  = () => {
    localStorage.removeItem('categories');
  }

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Uncategorized';
  };

  const getOverdueCount = () => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return todos.filter(todo => 
      !todo.completed && 
      todo.dueDate && 
      new Date(todo.dueDate) < today
    ).length;
  };

  const sortedAndFilteredTodos = getSortedTodos(filteredTodos);

  return (
    <Container className='py-4'>
      <Row className='mb-4'>
        <Col>
          <Card>
            <Card.Header >
              <Row className="d-flex justify-content-between align-items-center">
                <Col md={8}>
                  <h1 className="mb-0">TODO List</h1>
                  {getOverdueCount() > 0 && (
                    <small className="text-danger">
                      {getOverdueCount()} overdue task{getOverdueCount() > 1 ? 's' : ''}
                    </small>
                  )}
                </Col>
                <Col md={4} className="d-flex justify-content-end align-items-center">
                  <AddTodoForm onAddTodo={addTodo} categories={categories}/>
                  <AddCategories onAddCategory={addCategory} />
                </Col>
              </Row>
            </Card.Header>
            
            <Card.Body className="border-bottom py-3">
              <Row className="align-items-center">
                <Col md={4}>
                  {categories.length > 0 && (
                    <Form.Group className="d-flex align-items-center gap-2 mb-0">
                      <Form.Label className="mb-0 text-muted">Filter:</Form.Label>
                      <Form.Select 
                        size="sm"
                        value={selectedCategoryFilter}
                        onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                        style={{ width: 'auto' }}
                      >
                        <option value="all">All Categories</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  )}
                </Col>
                
                <Col md={4}>
                  <Form.Group className="d-flex align-items-center gap-2 mb-0">
                    <Form.Label className="mb-0 text-muted">Sort by:</Form.Label>
                    <Form.Select 
                      size="sm"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      style={{ width: 'auto' }}
                    >
                      <option value="priority">Priority</option>
                      <option value="dueDate">Due Date</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                
                <Col md={4} className="text-end">
                  {selectedCategoryFilter !== 'all' && (
                    <small className="text-muted">
                      Showing: {getCategoryName(parseInt(selectedCategoryFilter))} 
                      ({filteredTodos.length} todos)
                    </small>
                  )}
                </Col>
              </Row>
            </Card.Body>

            <Card.Body>
              {sortedAndFilteredTodos.length === 0 ? ( 
                <p className="no-todos text-center text-muted py-4">
                  {selectedCategoryFilter === 'all' 
                    ? "No TODOs yet. Add one above!" 
                    : `No TODOs in ${getCategoryName(parseInt(selectedCategoryFilter))} category.`
                  }
                </p> 
              ) : ( 
              <ul className="todo-list list-unstyled"> 
                {sortedAndFilteredTodos.map(todo => ( 
                  <TodoItem 
                    key={todo.id} 
                    todo={todo} 
                    categories={categories}
                    onToggle={toggleTodo} 
                    onDelete={deleteTodo} 
                  /> 
                ))} 
              </ul>
              )}
            </Card.Body>

            <Card.Footer className="d-flex justify-content-between align-items-center">
              <span className='text-muted'>
                Total: {todos.length} | 
                {selectedCategoryFilter === 'all' ? (
                  <> Completed: {todos.filter(t => t.completed).length}</>
                ) : (
                  <> Filtered: {filteredTodos.length} | Completed: {filteredTodos.filter(t => t.completed).length}</>
                )}
                {getOverdueCount() > 0 && (
                  <> | <span className="text-danger">Overdue: {getOverdueCount()}</span></>
                )}
              </span>
              <CategoryItem categories={categories} onDelete={deleteCategory} onReset={resetCategory}/>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      
    </Container>
  );
}

export default App;
