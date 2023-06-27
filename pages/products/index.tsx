import { useGetProductsQuery } from "@/generated/api";
import { NextPage } from "next";
import Loader from "@/components/Loader/Loader";

const Products: NextPage = () => {
  const { data, loading } = useGetProductsQuery();
  const products = data?.products?.edges;

  return (
    <div>
      { loading && <Loader /> }

      {products &&
      products.map((product) => (
        <p key={product?.node?.id}>
          { product?.node?.name ?? 'No name: something is wrong' }
        </p>
      ))}
      
    </div>
  )
}

export default Products;
