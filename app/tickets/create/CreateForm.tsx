"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateForm = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState("low");

  const [isLoading, setLoading] = useState(false);

  return (
    <main>
      <form className="w-1/2">
        <label>
          <span>Title:</span>
          <input
            required
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>

        <label>
          <span>Body:</span>
          <input
            required
            type="text"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
        </label>

        <label>
          <span>Priority:</span>
          <select onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </label>

        <button className="btn-primary" disabled={isLoading}>
          {isLoading ? <span>Adding</span> : <span>Add Ticket</span>}
        </button>
      </form>
    </main>
  );
};

export default CreateForm;
