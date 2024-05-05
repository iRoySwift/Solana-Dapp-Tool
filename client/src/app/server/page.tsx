import React, { use } from 'react';
import { getTodo } from '../api/server/getTodo';

const getData = async () => {
  // test api
  const res = await fetch(`http://localhost:3000/api/test`, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
  });
  const todo: string = await res.json();
  return todo;
};

interface Props {}
const Server: React.FC<Props> = async () => {
  // const todo: any = use(getData());

  const todo = await getTodo();
  console.log('🚀 ~ Home ~ todo:', todo);
  return <div>{todo.title}</div>;
};
export default Server;
