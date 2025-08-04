import Breadcrumbs from "../components/Breadcrumbs";

export default function HomePage() {

    return (
      <div className="max-w-screen-2xl mx-auto">
        <Breadcrumbs items={[]} />
        <h1 className="text-2xl font-bold mb-6">Главная</h1>
      </div>
    )
}