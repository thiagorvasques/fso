import { useState } from "react";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onClick = () => {
    console.log("should reset", value);
    if (type === "button") {
      console.log("button clicked");
      setValue("");
    }
  };

  return {
    type,
    value,
    onChange,
    onClick,
  };
};

export default useField;
