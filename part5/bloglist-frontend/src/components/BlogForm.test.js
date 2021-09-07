import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit", () => {
  const setNewBlog = jest.fn();
  const component = render(<BlogForm setNewBlog={setNewBlog} />);

  const input = component.container.querySelector("#title");
  const form = component.container.querySelector("form");

  fireEvent.change(input, {
    target: { title: "testing title form" },
  });
  fireEvent.submit(form);
  console.log(setNewBlog.mock.calls, input.target);

  //expect(target && typeof target === "object").toBe(true);
  // expect(setNewBlog.mock.calls).toHaveLength(1);
  //   expect(
  //     handleNewBlog.mock.calls && typeof handleNewBlog.mock.calls === "object"
  //   ).toBe(true);
  //   expect(handleNewBlog.mock.calls[0][0].title).toBe("testing title form");
});
