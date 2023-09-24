import { useEffect } from "react";
import { useState } from "react"

export const TodoApp = () => {

  const [todoList, setListTodo] = useState([]);
  const [todo, setTodo] = useState('');


  useEffect(() => {
      // Se obtienen los todos del localStorage
      const todos = JSON.parse(localStorage.getItem('todoList')) ;
      setListTodo(todos)
  }, [])

  useEffect(() => {
    if(todoList.length > 0){
      localStorage.setItem('todoList', JSON.stringify(todoList));
    }
  }, [todoList])

  // Completar tarea
  const handleDone = (id) => {
    const newList = todoList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          done: !item.done
        }
      } else {
        return item;
      }
    })

    setListTodo(newList)
  }

  // Agregar tarea
  const handleAdd = () => {
    if (todo.trim().length <= 1) return;

    const newTodo = {
      id: new Date().getTime(),
      desc: todo,
      done: false
    };
    setListTodo([...todoList, newTodo]);
    setTodo('');
  }

  // Cambiar valor del input
  const handleInputChange = ({ target }) => {
    setTodo(target.value)
  }

  return (
    <div className="container">
      {/* Header */}
      <div className="row">
        <div className="col-12">
          <h1>TodoApp ( {todoList.length} )</h1>
        </div>
      </div>

      {/* TodoFilter */}
      <div className="row mb-3">
        <div className="col d-flex gap-1">
          <button className="btn btn-sm btn-primary">All</button>
          <button className="btn btn-sm btn-success">Active</button>
          <button className="btn btn-sm btn-danger">Completed</button>
          <button className="btn btn-sm btn-warning">Clear Completed</button>
        </div>
      </div>

      {/* TodoAdd */}
      <div className="row mb-3">
        <div className="col-sm-12 col-md-4 mb-2 mb-md-3 mb-lg-0 ">
          <h3>New Todo</h3>
          <input
            type="text"
            className="form-control"
            placeholder="Add Todo"
            name="desc"
            value={todo.desc}
            onChange={handleInputChange}
            // Evento cuando presiona tecla Enter en ASCII
            onKeyUpCapture={(e) => {
              if (e.code === 'Enter') {
                handleAdd()
              }
            }
            }

          />
        </div>

        {/* TodoList */}
        <div className="col-sm-12 col-md-8">
          <h3>Todo List</h3>
          <ul className="list-unstyled">
            {/* TodoItems  */}
            {
              (todoList.length === 0)
                ?
                (
                  <li className="alert alert-info text-center">No hay tareas</li>
                )
                :
                (
                  todoList.map((item) => (
                    <li key={item.id} className={`d-flex justify-content-between alert ${item.done ? 'alert-success' : 'alert-warning'}`}>
                      <span>{item.desc}</span>
                      <button
                        className="btn btn-sm"
                        onClick={() => handleDone(item.id)}
                      >
                        {
                          (item.done)
                            ?
                            ("Completada ")
                            :
                            ("Completar")
                        }

                      </button>
                    </li>

                  ))
                )
            }
          </ul>

        </div>
      </div>
    </div>
  )
}
