import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import UpdateTodo from './UpdateTodo';
import { MdOutlineMenu } from 'react-icons/md';

function App() {
  const loadTodos = useLoaderData() || [];
  const [allTodos, setAllTodos] = useState(loadTodos);

  // Add todo
  const handleAddTodo = (e) => {
    e.preventDefault();
    const form = e.target;
    const todo = form.todo.value;

    fetch('http://localhost:5000/todo', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ todo }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAllTodos(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }

        if (data.insertedId) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            iconColor: '#AF7EEB',
            title: 'Your Todo has been Added',
            showConfirmButton: false,
            timer: 1500,
          });
        }

        form.reset();
      });
  };

  // Delete todo
  const handleDelete = (_id) => {
    fetch(`http://localhost:5000/todo/${_id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            iconColor: '#AF7EEB',
            title: 'Your Todo has been Deleted',
            showConfirmButton: false,
            timer: 1500,
          });
          const remainingTodos = allTodos.filter((todo) => todo._id !== _id);
          setAllTodos(remainingTodos);
        }
      });
  };

  // Update todo
  const handleUpdate = (_id, updatedTodo) => {
    console.log(_id, updatedTodo);
    fetch(`http://localhost:5000/todo/${_id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ todo: updatedTodo }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          const updatedTodos = allTodos.map((todo) =>
            todo._id === _id ? { ...todo, todo: updatedTodo } : todo
          );
          setAllTodos(updatedTodos);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            iconColor: '#AF7EEB',
            title: 'Your Todo has been Updated',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-first-color">
      <section className="w-1/4">
        <div className="bg-second-color shadow-xl w-full font-bold py-3 text-center rounded-md">
          <h3 className="text-white text-sm flex justify-between items-center px-5 lg:text-2xl">
            <span className="px-2"><MdOutlineMenu /></span>Todo List App
          </h3>
        </div>
        <div className="bg-white shadow-xl mt-4 py-5 font-semibold grid justify-center text-gray-400 text-xs rounded-md lg:text-xl">
          {allTodos.map((todo) => (
            <UpdateTodo key={todo._id} todos={todo} handleDelete={handleDelete} handleUpdate={handleUpdate} />
          ))}
        </div>
        <div className="bg-second-color mt-4 shadow-xl py-3 rounded-md">
          <form onSubmit={handleAddTodo} className="flex gap-2 justify-center px-3">
            <input type="text" name="todo" placeholder="Type here" className="input input-bordered w-full max-w-xs bg-white text-center" />
            <button className="btn bg-white border-none">Add</button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default App;
