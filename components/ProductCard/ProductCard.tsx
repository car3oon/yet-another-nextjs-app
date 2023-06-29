import Image from 'next/image';

type ProductCardProps = {
  name: string;
  category: Category;
  thumbnail: ProductThumbnail;
};

type Category = {
  id: string;
  name: string;
};

type ProductThumbnail = {
  url: string;
};

export default function ProductCard({
  name,
  category,
  thumbnail,
}: ProductCardProps) {
  return (
    <div className='w-full text-center max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <Image
        className='p-8 rounded-t-lg mx-auto'
        src={thumbnail.url}
        alt='product image'
        width='200'
        height='200'
      />
      <div className='px-5 pb-5'>
        <h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
          {name}
        </h5>
        {category && (
          <div className='text-sm mt-2.5 mb-5'>
            <span className='font-bold text-slate-600'>Category: </span>
            {category.name}
          </div>
        )}
      </div>
    </div>
  );
}
