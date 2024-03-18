import React from "react";
import { Task } from "features/TodolistsList/Todolist/Tasks/Task/Task";
import { TaskStatuses } from "common/enums";
import { TodolistDomainType } from "features/TodolistsList/model/todolists/todolists.reducer";
import { TaskType } from "features/TodolistsList/api/tasks/tasksApi.types";

type Props = {
  tasks: TaskType[];
  todolist: TodolistDomainType
};
export const Tasks = ({tasks, todolist}: Props) => {
  const {id, filter} = todolist

  let tasksForTodolist = tasks;

  if (filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <div>
      {tasksForTodolist.map((t) => (
        <Task
          key={t.id}
          task={t}
          todolistId={id}
        />
      ))}
    </div>
  );
};

