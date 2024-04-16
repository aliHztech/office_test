import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addUser, deleteTask } from "../redux/TodoSlice";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import { editTask } from "../redux/TodoSlice";
const Task = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.todo);
  const existingUser = state.data.filter((f) => f.id == id);
  const mainObj = existingUser[0];
  console.log(mainObj, "mainObj");
  const findId = mainObj.hasOwnProperty("task");
  const [task, setTask] = useState("");
  const [deadLine, setDeadLine] = useState("");

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleEditShow = () => setShowEdit(true);
  const handleEditclose = () => setShowEdit(false);

  const addTaskFunc = (e) => {
    e.preventDefault();
    setTask("");
    setDeadLine("");
    dispatch(
      addUser({
        id,
        key: findId ? mainObj.task.length : 0,
        task: task,
        deadLine: deadLine,
      })
    );
    handleClose();
    toast.success("Task Added successfully");
  };

  const handleDelete = (key, searchID) => {
    const user = mainObj.task.find((f) => f.key === key);
    if (user) {
      const newArray = mainObj.task.filter((f) => f.key !== key);
      dispatch(deleteTask({ newArray, id }));
    }
    toast.error("task deleted successfully !!");
  };
  const [mainKey, setMainKey] = useState();
  if (findId) {
    const mainTask = mainObj.task.filter((f) => f.key == mainKey);
    var taskObject = mainTask[0];
    console.log(taskObject, "taskObject.task ...............");
  }

  const modalPopup = async (k) => {
    const mainTask = mainObj.task.find((f) => f.key == k);
    if (mainTask) {
      setTask(mainTask.task);
      setDeadLine(mainTask.deadLine);
      handleEditShow();
      setMainKey(k);
    }
  };

  const handleEdit = (event) => {
    event.preventDefault();
    console.log(mainKey, "mainKey");
    dispatch(editTask({ id, key: mainKey, task, deadLine }));
    handleEditclose();
    toast.success("Task Updated successfully", { theme: "dark" });
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>TASK</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex w-100 vh-100 justify-content-center align-items-center ">
            <div className="border bg-secondary text-white responsive w-100 p-2">
              <h3>Add User Task</h3>
              <form onSubmit={addTaskFunc}>
                <div>
                  <label htmlFor="name">task:</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="name">deadline:</label>
                  <input
                    type="date"
                    name="name"
                    className="form-control"
                    value={deadLine}
                    onChange={(e) => setDeadLine(e.target.value)}
                    required
                  />
                </div>
                <br />
                <button className="btn btn-info"> ADD</button>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={showEdit} onHide={handleEditclose}>
        <Modal.Header closeButton>
          <Modal.Title>TASK</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
            <div className="w-50 border bg-secondary text-white p-5  w-100 p-2">
              <h3>Update User Task</h3>
              <form onSubmit={handleEdit}>
                <div>
                  <label htmlFor="name">Task:</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email">Deadline:</label>
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={deadLine}
                    onChange={(e) => setDeadLine(e.target.value)}
                    required
                  />
                </div>

                <br />
                <button className="btn btn-info"> Update</button>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <button className="btn btn-info my-3" onClick={handleShow}>
        Add New Task
      </button>
      <table className="table">
        <thead>
          <tr>
            <td>TASK</td>
            <td>DEADLINE</td>
            <td>Delete</td>
            <td>Edit</td>
          </tr>
        </thead>
        {findId && mainObj.task.length !== 0 ? (
          <tbody>
            {mainObj.task.map((d, i) => {
              return (
                <tr key={i}>
                  <td>{d.task}</td>
                  <td>{d.deadLine}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger "
                      onClick={() => handleDelete(d.key, id)}
                    >
                      {" "}
                      Delete{" "}
                    </button>
                  </td>
                  <td>
                    {" "}
                    <Button
                      onClick={() => modalPopup(d.key)}
                      className="btn-sm btn btn-info "
                    >
                      edit{" "}
                    </Button>
                    {/* <Button
                      variant="primary"
                      onClick={() => setModalShow(true)}
                    >
                      Launch vertically centered modal
                    </Button> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <p>No tasks available</p>
        )}
      </table>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Task;
