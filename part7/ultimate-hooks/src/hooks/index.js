import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(baseUrl);
      setResources(response.data);
    };
    fetch();
  }, [baseUrl]);

  const create = async (resource) => {
    try {
      await axios.post(baseUrl, resource);
      const resourceid = {
        ...resource,
        id: resources[resources.length - 1] + 1,
      };
      setResources(resources.concat(resourceid));
    } catch (error) {
      console.log(error);
    }
  };

  const service = {
    create,
  };

  return [resources, service];
};
