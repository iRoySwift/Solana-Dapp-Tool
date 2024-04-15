import { notFound } from "next/navigation";
import type { Todo } from "./todo";

export const getTodo = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/1`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        // Render the closest `error.js` Error Boundary
        throw new Error("Something went wrong!");
    }

    const todo = (await res.json()) as Todo;

    if (!todo.title) {
        // Render the closest `not-found.js` Error Boundary
        notFound();
    }

    return todo;
};
