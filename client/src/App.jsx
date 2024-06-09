import { MdOutlineMenu, MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Swal from 'sweetalert2'
import { useLoaderData } from "react-router-dom";

function App() {
  const loadTodos = useLoaderData()

  const handleAddTodo = e =>{
      e.preventDefault()
      const form = e.target;
      const todo = form.todo.value;
      

      console.log(todo);

      fetch('http://localhost:5000/todo', {
        method:'POST',
        headers:{
          'content-type': 'application/json'
        },
        body:JSON.stringify({todo})
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if(data.insertedId){
          Swal.fire({
            position: "top-end",
            icon: "success",
            iconColor:'#AF7EEB',
            title: "Your Todo has been Added",
            showConfirmButton: false,
            timer: 1500
          });
          form.reset()
        }
      })

  }


  return (
   <main className="flex items-center justify-center min-h-screen bg-first-color">
        <section className="w-1/4">
          <div className="bg-second-color shadow-xl w-full font-bold py-3 text-center rounded-md">
            <h3 className="text-white text-sm flex justify-between items-center px-5 lg:text-2xl"> <span className="px-2"><MdOutlineMenu/></span>Todo List App</h3>
          </div>
          <div className="bg-white shadow-xl mt-4 py-5 font-semibold grid justify-center text-gray-400 text-xs rounded-md lg:text-xl">
            {
              loadTodos.map(todo => <p key={todo._id} className="flex items-center gap-4">{todo.todo} <span><FaRegEdit/></span><span><MdDelete/></span></p>)
            }
            
          </div>
          <div className="bg-second-color mt-4 shadow-xl py-3 rounded-md">
            <form onSubmit={handleAddTodo} className="flex gap-2 justify-center px-3">
            <input type="text" name="todo" placeholder="Type here" className="input input-bordered w-full max-w-xs bg-white text-center" />
            <button  className="btn bg-white border-none">Add</button>
            </form>
          </div>
        </section>
   </main>
  )
}

export default App
