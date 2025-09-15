import AnimatedCheckbox from "@/components/ui/AnimatedCheckbox";
import clsx from "clsx";

export default function BooleanFilter({ label, value = false, onChange, options }) {
  // console.log(options);
  return (
    <section className="rounded-lg p-3">
      <AnimatedCheckbox
        checked={!!value}
        label={options.title}
        onToggle={() => onChange(!value)}
      />
    </section>
  );
}