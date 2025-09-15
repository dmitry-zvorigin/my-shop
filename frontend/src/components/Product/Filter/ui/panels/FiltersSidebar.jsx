export default function FiltersSidebar({ filters=[], renderFilter}) {

  return (
    <>
      {(filters ?? []).map(f => renderFilter(f))}
    </>
  );
}