import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editTask } from "../redux/TodoSlice";

const Edit = () => {
  const { id, key } = useParams();
  const state = useSelector((state) => state.todo);
  const existingUser = state.data.filter((f) => f.id == id);
  const mainUser = existingUser[0].task.filter((f) => f.key == key);
  const taskObject = mainUser[0];
  console.log(taskObject, "task object");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [task, setTask] = useState(taskObject.task);
  const [deadLine, setDeadLine] = useState(taskObject.deadLine);

  const handleEdit = () => {
    dispatch(editTask({ id, key, task, deadLine }));
    navigate(`/task/${id}`);
  };
  return (
    <>
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
        <div className="w-50 border bg-secondary text-white p-5 responsive">
          <h3>Update User Task</h3>
          <form onSubmit={handleEdit}>
            <div>
              <label htmlFor="name">Name:</label>
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
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                name="email"
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
    </>
  );
};

export default Edit;
