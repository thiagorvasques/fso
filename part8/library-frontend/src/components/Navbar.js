import React from "react";

function Navbar({ setPage, token, logout }) {
  if (!token) {
    return (
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("login")}>Login</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => setPage("authors")}>authors</button>
      <button onClick={() => setPage("books")}>books</button>
      <button onClick={() => setPage("add")}>add book</button>
      <button onClick={() => setPage("recommendation")}>recommend</button>
      <button onClick={() => logout()}>logout</button>
    </div>
  );
}

export default Navbar;
