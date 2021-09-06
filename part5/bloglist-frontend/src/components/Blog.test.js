import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";
import { prettyDOM } from "@testing-library/react";

describe("<Blog />", () => {
  let component;
  const refs = [0, 1];
  const index = 0;
  const mockHandler = jest.fn();
  const blog = {
    title: "Testing React Apps",
    author: "mluukai",
    url: "someurl.com",
    likes: 10,
  };

  beforeEach(() => {
    component = render(
      <Blog blog={blog} refs={refs[index]} updateLike={mockHandler} />
    );
  });

  test("renders content", () => {
    const div = component.container.querySelector(".blog");
    console.log(prettyDOM(div));
    expect(div).toHaveTextContent("Testing React Apps");
  });

  test("at start the children are not displayed", () => {
    const notShown = component.container.querySelector(".togglableContent");

    expect(notShown).toHaveStyle("display: none");
  });

  test("if the like button is clicked twice", () => {
    const button = component.getByText("Like");
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
