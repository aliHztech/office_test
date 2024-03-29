import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { addUser, deleteTask } from "../redux/TodoSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Task = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.todo);
  console.log(state.data, id);
  const existingUser = state.data.filter((f) => f.id == id);
  const mainObj = existingUser[0];
  console.log(mainObj, "mainObj");
  const findId = mainObj.hasOwnProperty("task");
  const [task, setTask] = useState("");
  const [deadLine, setDeadLine] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

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
    // console.log(mainObj.task, "\\\\\\\\\\\\\\\\\\\\\\\\\\\\");
    const user = mainObj.task.find((f) => f.key === key);
    // console.log(user);
    if (user) {
      const newArray = mainObj.task.filter((f) => f.key !== key);
      dispatch(deleteTask({ key, newArray, id }));
    }
    toast.error("task deleted successfully !!");
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>TASK</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex w-100 vh-100 justify-content-center align-items-center ">
            <div className="border bg-secondary text-white responsive">
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
        {mainObj.hasOwnProperty("task") ? (
          <tbody>
            {console.log(mainObj.task)}
            {mainObj.task.map((d, i) => {
              // console.log(d.task, "tassssssssssssssssssssskkkkk");
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
                    <Link
                      to={`/edit/${id}/${d.key}`}
                      className="btn-sm btn btn-info "
                    >
                      edit{" "}
                    </Link>
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
