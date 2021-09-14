import React from "react";

import "./styles/blog.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
function BlogsList() {
  const blogs = useSelector((state) => state.blogs);
  console.log("Sorted List", blogs);

  return (
    <Table striped bordered hover className="mt-2">
      <tbody>
        {blogs.map((blog, index) => {
          return (
            <tr className="blog" key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default BlogsList;
