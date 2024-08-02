import { useEffect, useState } from "react";

export type Result<T> =
  | ["loading", undefined]
  | ["success", T]
  | ["error", Error];

/**
 * Let's look at one more example of discriminated unions. This time, we're
 * going to use them to make the tuple return type of a hook smarter.
 *
 * 1. Change the Result type so that the second element is inferred
 * from narrowing the first.
 *
 * const [status, value] = useData<{ title: string }>(
 *   "https://jsonplaceholder.typicode.com/todos/1",
 * );
 *
 * When status is 'loading', value should be undefined.
 * When status is 'error', value should be an Error.
 * When status is 'success', value should be T.
 */

type Fetch<TData> =
  | ["idle"]
  | ["loading"]
  | ["fulfilled", TData]
  | ["error", Error];

export const useData = <T,>(url: string): Fetch<T> => {
  const [result, setResult] = useState<Fetch<T>>(["loading"]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setResult(["fulfilled", data]))
      .catch((error) => setResult(["error", error]));
  }, [url]);

  return result;
};

const Component = () => {
  const [status, value] = useData<{ title: string }>(
    "https://jsonplaceholder.typicode.com/todos/1"
  );

  if (status === "idle") return <></>;

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error: {value.message}</div>;
  }

  return <div>{value.title}</div>;
};
