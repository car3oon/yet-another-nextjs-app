import { useGetChannelsQuery } from '@/generated/api';
import { NextPage } from 'next';
import Loader from '@/components/Loader/Loader';

const Channels: NextPage = () => {
  const { data, loading } = useGetChannelsQuery();
  const channels = data?.channels;

  return (
    <div>
      {loading && <Loader />}
      {channels &&
        channels.map((channel) => (
          <p key={channel?.id}>
            {channel?.isActive ?? 'No name: something is wrong'}
          </p>
        ))}
    </div>
  );
};

export default Channels;
