import Image from 'next/image';

type UserCardProps = {
  avatar: AvatarProps;
  email: string;
  firstName: string;
  lastName: string;
};

type AvatarProps = {
  url: string;
};

export default function UserCard({
  email,
  avatar,
  firstName,
  lastName,
}: UserCardProps) {
  return (
    <div>
      <div className='md:flex bg-white shadow-md rounded-xl p-3'>
        <Image
          className='w-24 h-24 rounded-full'
          width='300'
          height='225'
          src={avatar?.url}
          alt=''
        />
        <div className='p-8 text-center space-y-3'>
          <p className='text-large font-medium'>
            <span className='text-indigo-900'>
              {firstName} {lastName}
            </span>{' '}
            ({email}) has successfully logged in.
          </p>
        </div>
      </div>
    </div>
  );
}
