import React, { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useApolloClient, useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "./queries";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import Recommendation from "./components/Recommendation";
import { ALL_BOOKS } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const result = useQuery(ALL_AUTHORS);
  const client = useApolloClient();

  const response = useQuery(ALL_BOOKS);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (result.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar setPage={setPage} token={token} logout={logout} />

      <Authors
        show={page === "authors"}
        result={result.data.allAuthors}
        token={token}
      />

      <Books show={page === "books"} books={response.data} client={client} />

      <NewBook show={page === "add"} setPage={setPage} />

      <LoginForm
        show={page === "login"}
        setToken={setToken}
        token={token}
        setPage={setPage}
      />
      <Recommendation
        show={page === "recommendation"}
        client={client}
        books={response.data}
      />
    </div>
  );
};

export default App;
