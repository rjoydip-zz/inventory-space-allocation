import { useState } from "react";
import { RiDragDropFill } from "react-icons/ri";
import Listview from "./Listview";

export default function DragListView ({ data, onDragEnd }) {
    const initialDnDState = {
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    };
  
    const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);
  
    // onDragStart fires when an element
    // starts being dragged
    const onDragStart = (event) => {
      const initialPosition = Number(event.currentTarget.dataset.position);
  
      setDragAndDrop({
        ...dragAndDrop,
        draggedFrom: initialPosition,
        isDragging: true,
      });
  
      // Note: this is only for Firefox.
      // Without it, the DnD won't work.
      // But we are not using it.
      event.dataTransfer.setData("text/html", "");
    };
  
    // onDragOver fires when an element being dragged
    // enters a droppable area.
    // In this case, any of the items on the list
    const onDragOver = (event) => {
      // in order for the onDrop
      // event to fire, we have
      // to cancel out this one
      event.preventDefault();
  
      // index of the droppable area being hovered
      const draggedTo = Number(event.currentTarget.dataset.position);
  
      if (draggedTo !== dragAndDrop.draggedTo) {
        setDragAndDrop({
          ...dragAndDrop,
          draggedTo: draggedTo,
        });
      }
    };
  
    const onDrop = () => {
      setDragAndDrop({
        ...dragAndDrop,
        draggedFrom: null,
        draggedTo: null,
        isDragging: false,
      });
  
      onDragEnd(dragAndDrop.draggedFrom, dragAndDrop.draggedTo);
    };
  
    const onDragLeave = () => {
      setDragAndDrop({
        ...dragAndDrop,
        draggedTo: null,
      });
    };
  
    return (
      <ul>
        {data.map((item, index) => (
          <li
            key={index}
            data-position={index}
            draggable
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragLeave={onDragLeave}
            className={
              dragAndDrop && dragAndDrop.draggedTo === Number(index)
                ? "dropArea"
                : ""
            }
          >
            <Listview>
              <div className="select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4">
                <div className="flex-1 pl-1">
                  <div className="font-medium dark:text-white">{item.rackName}</div>
                  <div className="text-gray-600 dark:text-gray-200 text-sm">
                    {item.rackCapacity} {item.measurement}
                  </div>
                </div>
                <div className="flex flex-row justify-center">
                  <button className="w-10 text-right flex justify-end">
                    <RiDragDropFill />
                  </button>
                </div>
              </div>
            </Listview>
          </li>
        ))}
      </ul>
    );
  };