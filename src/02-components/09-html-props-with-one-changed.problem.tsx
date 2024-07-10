import { InputHTMLAttributes } from "react";
import { Equal, Expect } from "../helpers/type-utils";

type OverRideProps<T, TOverRidden> = Omit<T, keyof TOverRidden> & TOverRidden;

export const Input = (
  props: OverRideProps<
    InputHTMLAttributes<HTMLInputElement>,
    {
      onChange: (e: string) => void;
    }
  >
) => {
  return (
    <input
      {...props}
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
    ></input>
  );
};

const Parent = () => {
  return (
    <Input
      onChange={(e) => {
        console.log(e);

        type test = Expect<Equal<typeof e, string>>;
      }}
    ></Input>
  );
};
