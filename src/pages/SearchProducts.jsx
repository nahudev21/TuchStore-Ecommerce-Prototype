import { useLocation } from 'react-router-dom'
import { getProductsByNameRequest } from "../api/product";
import { useEffect, useState } from 'react';
import ProductsSearchCard from '../components/ProductsSearchCard';

export default function SearchProducts() {

  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState(false);  

  const query = useLocation();
  const productName = query.search.substring(3);

  const searchProductsByName = () => {
    setLoading(true);
    let timer = setTimeout( async () => {
      const res = await getProductsByNameRequest(productName);
      setLoading(false);
      setData(res.data)
    }, 1000);

    return () => clearTimeout(timer);
  }

  useEffect(() => {
    searchProductsByName();
  }, [query])

  return (
    <div className='container mx-auto p-4 min-h-[calc(100vh-120px)] '>
      {
        loading && (<p className='text-lg text-center'>Cargando...</p>)
      }
      
      <p className='text-lg font-semibold my-3'>Resultados de búsqueda: {data?.length}</p>

      {
        data?.length === 0 && !loading && (
            <p className='text-lg p-4 text-center font-medium'>Productos no encontrados relacionados a tu búsqueda...</p>
        )
      }

      {
        data?.length !== 0 && !loading && (
          <ProductsSearchCard loading={loading} data={data}/>
        )
      }
    </div>
  )
}
