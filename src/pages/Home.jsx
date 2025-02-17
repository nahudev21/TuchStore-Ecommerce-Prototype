import CategoryList from "../components/CategoryList";
import HorizontalproductsHome from "../components/HorizontalproductsHome";
import ProductBanner from "../components/ProductBanner";

export default function Home() {
  return (
    <div>
      <CategoryList />
      <ProductBanner />
      <HorizontalproductsHome category="Celulares" heading="Dispositivos Top" />
      <HorizontalproductsHome category="Cargadores" heading="Cargadores de todas las marcas" />
    </div>
  );
}
