export type Todo = {
  id: number;
  title: string;
  desc?: string;
  status: "complete" | "incomplete";
};

export type Project = {
  id: number;
  title: string;
  todos?: todo[];
};
