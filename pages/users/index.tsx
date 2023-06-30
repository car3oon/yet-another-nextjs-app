import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

type User = {
  id: string;
  name: string;
};

type Users = {
  users: User[];
};

export const getServerSideProps: GetServerSideProps<{
  users: Users;
}> = async () => {
  const res = await fetch('http://localhost:3000/api/users/');
  const { data } = await res.json();

  return {
    props: { users: data },
  };
};

export default function Users({
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className='w-full'>
      <h1 className='text-lg font-bold mb-5'>Users</h1>

      <div className='w-full grid grid-cols-5 gap-4'>
        {users.map((user) => (
          <div className='bg-white p-5 rounded shadow-md' key={user.id}>
            {user.name}
          </div>
        ))}
      </div>
    </div>
  );
}
