import { useState } from "react";
import Todo from "./Todo";
import "./TodoApp.css"

// la primera letra de TodoApp va en mayuscula para que react sepa que es un componente
export default function TodoApp() {
    // useState nos devuelve un arreglo con 2 elementos, el primer elemento 
    // es el valor que queremos manejar (como si fuera un getter) 
    // y el segundo elemento es la funcion que lo va a actualizar (como si fuera un setter) 
    // en useState() va el valor inicial de mi estado.
    const [title, setTitle] = useState("hola");
    const [todos, setTodos] = useState([])  // este lo uso para ir guardando todas las tareas

    function handleChange(e) {
        const value = e.target.value;
        setTitle(value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const newTodo = {
            id: crypto.randomUUID(),
            title: title,
            comleted: false,
        };

        const temp = [...todos];   // hago una copia de todos los todos
        temp.unshift(newTodo);      // agrego la nueva tarea al inicio del arreglo
        setTodos(temp);
        setTitle("");
    }

    function handleUpdate(id, value) {
        const temp = [...todos];
        const item = temp.find(item => item.id === id);
        item.title = value;
        setTodos(temp);
    }

    function handleDelete(id) {
        const temp = todos.filter(item => item.id !== id);
        setTodos(temp);
    }

    return (
        <div className="todoContainer">
            <form className="todoCreateForm" onSubmit={handleSubmit}>
                <input onChange={handleChange} className="todoInput" value={title}/>
                <input onClick={handleSubmit} type="submit" value="Crear Tarea" className="buttonCreate"/>
            </form>

            
            <div className="todosContainer">    
                {todos.map(item => (
                    //<div>{item.title}</div>
                    <Todo key={item.id} item={item} onUpdate={handleUpdate} onDelete={handleDelete}/>
                ))}
            </div>
        </div>
    );
}