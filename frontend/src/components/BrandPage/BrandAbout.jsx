export default function BrandAbout({ name, description }) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-3">{name}</h2>
      <div className="bg-white rounded-lg p-5">
        <p>{description}</p>
      </div>
    </section>
  );
}