import { useGetChannelsQuery } from '@/generated/api';
import { NextPage } from 'next';
import Loader from '@/components/Loader/Loader';
import { useRouter } from 'next/router';

const Channels: NextPage = () => {
  const router = useRouter();
  const { data, loading } = useGetChannelsQuery();
  const channels = data?.channels;
  const handleAddChannel = () => {
    router.push('/channels/add');
  };

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-5'>
        <h1 className='text-lg font-bold'>Channels</h1>
        <button
          onClick={handleAddChannel}
          className='bg-emerald-500 text-white hover:bg-emerald-600 rounded px-4 py-2'
        >
          Add channel
        </button>
      </div>
      {loading && <Loader />}
      <div className='grid grid-cols-2 gap-4'>
        {channels &&
          channels.map((channel) => (
            <div
              className='rounded p-5 bg-white shadow-sm text-slate-600'
              key={channel?.id}
            >
              <p>
                <span className='font-bold'>Channel name:</span> {channel?.name}
              </p>
              <p>
                <span className='font-bold'>Channel slug:</span> {channel?.slug}
              </p>
              <p>
                <span className='font-bold'>Default Country:</span>{' '}
                {channel?.defaultCountry.code}
              </p>
              <p>
                <span className='font-bold'>Active:</span>{' '}
                {channel?.isActive ? 'yes' : 'no'}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Channels;
