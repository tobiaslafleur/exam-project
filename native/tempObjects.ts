import { Task } from "./interfaces/interfaces";

export const tasks: Task[] = [
  {
    title: "Cook dinner",
    description: "Cook dinner pls i am hangry",
    time: new Date("2023-03-28T15:00:00"),
    priority: "Could",
    points: 1,
    status: "COMPLETED",
  },
  {
    title: "Go doctor",
    description: "Cook dinner pls i am hangry",
    time: new Date("2023-03-30T18:00:00"),
    priority: "Must",
    points: 1,
    status: "COMPLETED",
  },
  {
    title: "Empty closet",
    description: "Empty the damn closet man",
    time: new Date("2023-03-30T18:00:00"),
    priority: "Must",
    points: 1,
    status: "NOT_COMPLETED",
  },
  {
    title: "Go home",
    description: "Cook dinner pls i am hangry",
    time: new Date("2023-03-28T15:00:00"),
    priority: "Should",
    points: 1,
    status: "NOT_COMPLETED",
  },
  {
    title: "Toilet",
    description: "Cook dinner pls i am hangry",
    time: new Date("2023-03-27T15:00:00"),
    priority: "Could",
    points: 1,
    status: "NOT_COMPLETED",
  },
  {
    title: "Clean",
    description: "Cook dinner pls i am hangry",
    time: new Date("2023-03-27T15:00:00"),
    priority: "Could",
    points: 1,
    status: "COMPLETED",
  },
];
