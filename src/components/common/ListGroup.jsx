import React from "react";
const ListGroup = ({
  items,
  textProperty,
  selectedItem,
  valueProperty,
  onItemSelected
}) => {
  return (
    <ul className="list-group">
      {items.map((item, i) => (
        <li
          style={{ cursor: "pointer" }}
          className={
            selectedItem === item ? "list-group-item active" : "list-group-item"
          }
          key={item[valueProperty]}
          onClick={() => onItemSelected(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "id"
};
export default ListGroup;
