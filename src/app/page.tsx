
import FilerSection from "./FilerSection";
import ProductSection from "./ProductSection";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto mt-10 px-4">
      <div className="py-8 border-b border-slate-200 space-y-4">
        <h1 className="text-5xl font-semibold">Collection</h1>
        <p className="text-slate-700 max-w-3xl">
          <i> Oleh Hryhorash Expletech task </i><br/>
          We not only help you design exceptional products, but also make it
          easy for you to share your designs with more like-minded people.
        </p>
      </div>
      <div className="grid grid-cols-8 py-8 gap-10">
        <FilerSection />
        <div className="col-span-6">
          <ProductSection />
        </div>
      </div>
    </main>
  );
}
