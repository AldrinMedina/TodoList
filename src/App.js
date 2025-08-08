import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Dropdown, ButtonGroup } from 'react-bootstrap';
// import logo from './logo.svg';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import AddCategories from './AddCategories';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]); 
  const [nextId, setNextId] = useState(1); 
  const [categories, setCategories] = useState([]); 
  const [nextCategoryId, setNextCategoryId] = useState(1);
  

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
    localStorage.setItem('nextCategoryId', nextCategoryId.toString()); 
  }, [nextCategoryId]);


  const addTodo = (text, priority, categoryId) => { 
    const newTodo = { 
      id: nextId, 
      text: text, 
      priority: parseInt(priority),
      categoryId: categoryId,
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
  };

  const resetTodos = () => {
    localStorage.clear(); // or localStorage.removeItem('todos')
    setTodos([]);
    setNextId(1); // reset your ID counter
  };

  return (
    <Container className='py-4'>
      <Row className='mb-4'>
        <Col>
          <Card>
            <Card.Header >
              <Row className="d-flex justify-content-between align-items-center">
                <Col md={8}>
                  <h1 className="mb-0">My TODO App</h1>
                </Col>
                <Col md={4} className="d-flex justify-content-end align-items-center">
                  <AddTodoForm onAddTodo={addTodo} categories={categories}/>
                  <AddCategories onAddCategory={addCategory} />
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              {todos.length === 0 ? ( 
                <p className="no-todos">No TODOs yet. Add one above!</p> 
              ) : ( 
              <ul className="todo-list"> 
                {todos.sort((a, b) => a.priority - b.priority).map(todo => ( 
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
                Total: {todos.length} | Completed: {todos.filter(t => t.completed).length}
              </span>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      
    </Container>
  );
}

export default App;
