/**
 * It would be really nice to refactor this so that it's
 * more reusable. We can do that with a type helper.
 *
 * We want to create a type helper that takes in a type,
 * and returns it along with a union with all of its
 * keys turned to undefined.
 */

import { ChangeEventHandler } from "react";

type UndefinedObject<T> = Partial<Record<keyof T, undefined>>;
type AllOrNone<T> = T | UndefinedObject<T>;

export type InputProps = AllOrNone<{
  value: string;
  onChange: ChangeEventHandler;
}> & {
  label: string;
};

//  (
//   | {
//       value: string;
//       onChange: ChangeEventHandler;
//     }
//   | {
//       value?: undefined;
//       onChange?: undefined;
//     }
// ) & {
//   label: string;
// };

export const Input = ({ label, ...props }: InputProps) => {
  return (
    <div>
      <label>
        {label}
        <input {...props} />
      </label>
    </div>
  );
};

export const Test = () => {
  return (
    <div>
      <Input label="Greeting" value="Hello" onChange={() => {}} />
      <Input label="Greeting" />

      {/* @ts-expect-error */}
      <Input label="Greeting" value="Hello" />

      {/* @ts-expect-error */}
      <Input label="Greeting" onChange={() => {}} />
    </div>
  );
};
