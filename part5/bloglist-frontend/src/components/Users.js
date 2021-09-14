import React from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
function Users() {
  const users = useSelector((state) => state.users);

  return (
    <div>
      <Table striped bordered hover className="mt-2">
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
      </Table>
    </div>
  );
}

export default Users;
