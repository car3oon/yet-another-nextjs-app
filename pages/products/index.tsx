import { useGetProductsQuery } from '@/generated/api';
import { NextPage } from 'next';
import Loader from '@/components/Loader/Loader';
import ProductCard from '@/components/ProductCard/ProductCard';

const Products: NextPage = () => {
  const { data, loading } = useGetProductsQuery();
  const products = data?.products?.edges;

  return (
    <div>
      <h1 className='text-lg mb-4'>
        <span className='font-bold'>Products</span> (
        {data?.products?.totalCount})
      </h1>
      {loading && <Loader />}
      <div className='grid grid-cols-4 gap-4'>
        {products &&
          products.map((product) => (
            <ProductCard key={product?.node?.id} {...product.node} />
          ))}
      </div>
    </div>
  );
};

export default Products;
