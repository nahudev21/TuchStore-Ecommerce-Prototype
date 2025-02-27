import { useLocation, useNavigate } from 'react-router-dom'
import productCategory from "../helpers/productCategory";
import { useEffect, useState } from 'react';
import ProductsSearchCard from '../components/ProductsSearchCard';
import { filterProductsByCategoriesRequest } from "../api/product";

export default function CategoryProduct() {

  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListInArray = urlSearch.getAll("category");
  const urlCategoryListObject = {};
  urlCategoryListInArray.forEach(el => {
    urlCategoryListObject[el] = true;
  })

  const [selectedCategory, setSelectedCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);

  const [ sortBy, setSortBy ] = useState("");
  console.log("sortBy", sortBy)
  
  const filterProductsByCategories = async () => {
    const res = await filterProductsByCategoriesRequest(filterCategoryList);
    setData(res?.data || []);
  }

  useEffect(() => {
    if(!filterCategoryList.length -1) {
      filterProductsByCategories();
    }
  }, [filterCategoryList])

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;

    setSelectedCategory((preve) => {
      return {
        ...preve,
        [value]: checked
      }
    })

  } 

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectedCategory).map(categoryKeyName => {
      if(selectedCategory[categoryKeyName]) {
        return categoryKeyName
      }

      return null
    }).filter(el => el) 
    
    setFilterCategoryList(arrayOfCategory)

    //Formatear la url cuando cambie el checkbox
    const urlFormat = arrayOfCategory.map((el, index) => {
      if((arrayOfCategory.length -1) === index) {
        return `category=${el}`
      }

      return `category=${el}&&`
    })

    navigate("/product-category?"+urlFormat.join(""));

  }, [selectedCategory])

  const handleChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);

    if(value === "asc") {
      setData((preve) => preve.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }

    if (value === "dsc") {
      setData(preve => preve.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  }
    
  return (
    <div className="container mx-auto p-4">
      {/** Versión de escritorio */}
      <div className="hidden lg:grid grid-cols-[220px,1fr]">
        {/** left side */}
        <div className="bg-white p-2 my-2 min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] overflow-y-scroll">
          {/** Ordenar por precio */}
          <div className="">
            <h3 className="text-[16px] font-medium border-b border-slate-300 pb-1">
              Ordenar por Precio
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "asc"}
                  value={"asc"}
                  onChange={handleChangeSortBy}
                />
                <label>Precio - de Menor a Mayor</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "dsc"}
                  value={"dsc"}
                  onChange={handleChangeSortBy}
                />
                <label>Precio - de Mayor a Menor</label>
              </div>
            </form>
          </div>

          {/** Filtrar por categoría */}
          <div className="">
            <h3 className="text-[16px] font-medium border-b border-slate-300 pb-1">
              Filtrar por categoría
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory?.map((category) => {
                return (
                  <div key={category.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="category"
                      id={category?.value}
                      checked={selectedCategory[category?.value]}
                      value={category?.value}
                      onChange={handleSelectCategory}
                    />
                    <label htmlFor={category?.value}>{category?.label}</label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>

        {/** right side */}
        <div className="px-4">
          <h2 className="text-black font-medium text-base my-2">
            Resultado de búsqueda: {data?.length}
          </h2>

          <div className="min-h-[calc(100vh-110px)]">
            {data?.length !== 0 && !loading && (
              <ProductsSearchCard data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
