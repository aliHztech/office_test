import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodo } from "../redux/TodoSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.todo);
  console.log(state);
  return (
    <>
      <div className="container">
        <h2>Task Manager Web App</h2>
        {/* <Link to="/create" className="btn btn-success my-3">
        {" "}
        create +
      </Link> */}
        <button onClick={() => dispatch(fetchTodo())}></button>
        <table className="table">
          <thead>
            <tr>
              <td>
                <b>user name</b>
              </td>
              {/* <td>action</td> */}
            </tr>
          </thead>
          <tbody>
            {state.isloading ? (
              <h1>loading</h1>
            ) : (
              state.data.map((todo, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Link to={`/task/${todo.id}`}>{todo.username}</Link>
                    </td>

                    {/* <td>
                <Link
                  to={`/edit/${firstData.id}`}
                  className="btn btn-sm btn-primary"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(firstData.id)}
                  className="btn btn-sm btn-danger ms-2"
                >
                  Delete
                </button>
                <button className="btn btn-sm btn-warning ms-2">
                  Add Task
                </button>
              </td> */}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
