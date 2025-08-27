export default function BrandHero({ brand }) {

  return (
    <div className="flex justify-center items-center">
      {brand.logo_url && (
        <img src={brand.logo_url} alt={brand.name} className="object-contain" />
      )}
    </div>
  );
}