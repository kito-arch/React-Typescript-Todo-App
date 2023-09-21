import { fireEvent, render, screen } from "@testing-library/react";
import { TodoPage } from "./pages/todo";
import { DummyTodoList } from "./dummydata";

describe("Todos Rendering", () => {
  it("should render all the data", () => {
    render(<TodoPage />);
    const { getByText } = screen;
    DummyTodoList.forEach((item) => {
      expect(getByText(item.title)).toBeTruthy();
    });
  });

  it("should render all the data in the respective tabs", () => {
    render(<TodoPage />);
    const { getByText } = screen;
    const uncheckedItems = DummyTodoList.filter((item) => !item.checked);
    const checkedItems = DummyTodoList.filter((item) => item.checked);
    uncheckedItems.forEach((item) => {
      expect(getByText(item.title).style.textDecoration).toBe("none");
    });
    checkedItems.forEach((item) => {
      expect(getByText(item.title).style.textDecoration).toBe("line-through");
    });
  });

  it("should move unchecked todo to Done tab when click on checkbox", () => {
    render(<TodoPage />);
    const { getByText, getAllByRole } = screen;
    expect(getByText(DummyTodoList[0].title).style.textDecoration).toBe("none");

    const firstCheckBox = getAllByRole("checkbox")[0];
    fireEvent.click(firstCheckBox);
    expect(getByText(DummyTodoList[0].title).style.textDecoration).toBe(
      "line-through"
    );
  });
});
