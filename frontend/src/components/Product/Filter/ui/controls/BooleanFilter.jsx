import clsx from "clsx";
import { CheckboxRow } from "../primitives";

export default function BooleanFilter({ title, value, onChange }) {

  return (
    <section
      className="w-full flex items-center border-b-1 border-gray-300"
    >
      <CheckboxRow
        checked={!!value}
        label={title}
        onToggle={() => onChange(!value)}
        className={"py-3 px-3"}
        classText={"text-base"}
      />
    </section>
  );
}