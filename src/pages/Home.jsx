import CategoryList from "../components/CategoryList";
import HorizontalproductsHome from "../components/HorizontalproductsHome";
import ProductBanner from "../components/ProductBanner";
import VerticalproductsHome from "../components/VerticalCardProduct";

export default function Home() {
  return (
    <div>
      <CategoryList />
      <ProductBanner />
      <HorizontalproductsHome category="Auriculares" heading="AirPods Top" />
      <HorizontalproductsHome category="Cargadores" heading="Cargadores de todas las marcas" />
      <HorizontalproductsHome category="Fundas" heading="Fundas tanto originales como genéricas" />
      <VerticalproductsHome category="Celulares" heading="Todos los dispositivos" />
    </div>
  );
}
