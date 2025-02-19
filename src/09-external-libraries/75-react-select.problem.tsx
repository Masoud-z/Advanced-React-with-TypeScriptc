import ReactSelect, { GroupBase } from "react-select";
import { Equal, Expect } from "../helpers/type-utils";
import { StateManagerProps } from "react-select/dist/declarations/src/stateManager";

/**
 * 1. Try to figure out the types the props of the Select component should have,
 * including the generic types!
 *
 * Here's a clue: ReactSelect exports a type called 'Props'...
 */

type ReactSelectType = "primary" | "secondary";
export const Select = <
  TOptions,
  TMulti extends boolean = false,
  Group extends GroupBase<TOptions> = GroupBase<TOptions>
>(
  props: StateManagerProps<TOptions, TMulti, Group> & {
    type?: ReactSelectType ;
  }
) => {
  return <ReactSelect {...props} />;
};

interface Option {
  id: number;
  label: string;
}

const guitarists: Option[] = [
  {
    id: 1,
    label: "Jimi Hendrix",
  },
  {
    id: 2,
    label: "Stevie Ray Vaughan",
  },
];

<>
  <Select
    options={guitarists}
    onChange={(option) => {
      // It should infer the type of option!
      // If isMulti is false, it should NOT be an array
      type test = Expect<Equal<typeof option, Option | null>>;
    }}
  />

  <Select
    options={guitarists}
    isMulti
    onChange={(option) => {
      // If isMulti is true, it should be an array
      type test = Equal<typeof option, readonly Option[]>;
    }}
  />
</>;
