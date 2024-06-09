import { MdOutlineMenu, MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

function App() {


  return (
   <main className="flex items-center justify-center min-h-screen bg-first-color">
        <section className="w-1/2">
          <div className="bg-second-color shadow-xl w-full font-bold py-3 text-center">
            <h3 className="text-white text-2xl flex items-center gap-36"> <span className="px-2"><MdOutlineMenu/></span>Todo List App</h3>
          </div>
          <div className="bg-white shadow-xl mt-4 py-5 font-semibold grid justify-center text-gray-400 text-xl">
            <p className="flex items-center gap-4">First Todo <span><FaRegEdit/></span><span><MdDelete/></span></p>
            <p className="flex items-center gap-4">First Todo <span><FaRegEdit/></span><span><MdDelete/></span></p>
            <p className="flex items-center gap-4">First Todo <span><FaRegEdit/></span><span><MdDelete/></span></p>
            <p className="flex items-center gap-4">First Todo <span><FaRegEdit/></span><span><MdDelete/></span></p>
          </div>
          <div className="bg-second-color mt-4 shadow-xl py-3">
            <form className="flex gap-2 justify-center">
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs bg-white text-center" />
            <button className="btn bg-white border-none">Add</button>
            </form>
          </div>
        </section>
   </main>
  )
}

export default App
