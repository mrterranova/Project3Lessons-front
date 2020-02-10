import React from "react";

// This file exports both the List and ListItem components

export function List({ children }) {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">{children}</ul>
    </div>
  );
}

export function ListNote({ children }) {
  return <li className="list-group-item note-group">{children}</li>;
}