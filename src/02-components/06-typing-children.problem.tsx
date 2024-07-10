import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Button = (props: Props) => {
  return <button>{props.children}</button>;
};

const Parent = () => {
  return (
    <>
      {/* @ts-expect-error */}
      <Button></Button>
      <Button>Hello world!</Button>
    </>
  );
};
