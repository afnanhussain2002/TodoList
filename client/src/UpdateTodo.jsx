import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const UpdateTodo = ({ todos, handleDelete, handleUpdate }) => {
  const { _id, todo } = todos;
  const [selectedTodo, setSelectedTodo] = useState({ _id: '', todo: '' });

  const openModal = (todos) => {
    setSelectedTodo(todos);
    document.getElementById('my_modal_1').showModal();
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const updatedTodo = e.target.todo.value;
    handleUpdate(selectedTodo._id, updatedTodo);
    document.getElementById('my_modal_1').close();
  };
console.log(selectedTodo.todo);
console.log(selectedTodo._id);
  return (
    <>
      <div className="flex justify-between gap-3">
        <p>{todo}</p>
        <div>
          {/* Open the modal and set the selected todo */}
          <button onClick={() => openModal(todos)}>
            <FaRegEdit />
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Update {selectedTodo.todo}</h3>
              <form onSubmit={handleUpdateSubmit}>
                <input
                  type="text"
                  name="todo"
                  defaultValue={selectedTodo.togo}
                  className="input input-bordered w-full max-w-xs"
                />
                <button type="submit" className="btn mt-2">Update</button>
              </form>
              <div className="modal-action">
                <button className="btn" onClick={() => document.getElementById('my_modal_1').close()}>Close</button>
              </div>
            </div>
          </dialog>
          <button onClick={() => handleDelete(_id)}>
            <MdDelete />
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateTodo;
