import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodo } from "../redux/TodoSlice";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const Home = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.todo);
  const [btn, setbtn] = useState("Click To Get Usernames");
  console.log(state);
  return (
    <>
      <div className="container">
        <h2>Task Manager Web App</h2>
        <button
          className="btn btn-success my-3"
          onClick={() => dispatch(fetchTodo())}
        >
          Click To Get Usernames
        </button>
        <table className="table">
          <thead>
            <tr>
              <td>
                <b>user names</b>
              </td>
            </tr>
          </thead>
          <tbody>
            {state.isloading ? (
              <Loading />
            ) : (
              state.data.map((todo, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Link to={`/task/${todo.id}`}>{todo.username}</Link>
                    </td>
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
