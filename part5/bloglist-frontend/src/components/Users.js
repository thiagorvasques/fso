import React from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

function Users() {
  const users = useSelector((state) => state.users);

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
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
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
