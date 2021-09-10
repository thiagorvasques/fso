import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../reducers/userReducers";

function Users() {
  const users = useSelector((state) => state.users);
  console.log("should be list of users", users);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>User</td>
            <td>Blogs</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
