import React, { useEffect } from "react";
import { TodolistDomainType } from "features/TodolistsList/model/todolists/todolists.reducer";
import { tasksThunks } from "features/TodolistsList/model/tasks/tasksSlice";
import { useActions } from "common/hooks";
import { AddItemForm } from "common/components";
import { TaskType } from "features/TodolistsList/api/tasks/tasksApi.types";
import { FilterTasksButtons } from "../Todolist/FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "features/TodolistsList/Todolist/Tasks/Tasks";
import { TodolistTitle } from "../Todolist/TodolistTitle/TodolistTitle";

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist = React.memo(function ({todolist, tasks}: Props) {
  const { fetchTasks, addTask } = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(todolist.id);
  }, []);

  const addTaskCallback = (title: string) => {
    return addTask({ title, todolistId: todolist.id }).unwrap()
    }

  return (
    <div>
      <TodolistTitle todolist={todolist}/>
      <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === "loading"} />
      <div>
      <Tasks tasks={tasks} todolist={todolist}/>
      </div>
      <FilterTasksButtons todolist={todolist}/>
    </div>
  );
});
