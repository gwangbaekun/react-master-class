import React, { useState } from "react";

function ToDoList() {
  const [value, setValue] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={value} onChange={onChange} placeholder="write a to do" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
