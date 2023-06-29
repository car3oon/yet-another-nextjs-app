import { useCurrentUserQuery } from '@/generated/api';
import { useSaleorAuthContext } from '@saleor/auth-sdk/react';
import { useRouter } from 'next/router';
import Loader from '@/components/Loader/Loader';
import LoginForm from '@/components/LoginForm/LoginForm';
import UserCard from '@/components/UserCard/UserCard';

export default function LoginPage() {
  const router = useRouter();
  const { signOut } = useSaleorAuthContext();
  const { data, loading } = useCurrentUserQuery();

  const redirectToAccountSettings = () => {
    router.push('/account-settings');
  };
  const handleSignOut = () => {
    signOut();
  };

  function pageData() {
    if (data?.me) {
      return (
        <div>
          <UserCard {...data.me} />

          <div className='w-full text-right my-5 space-x-4'>
            <button
              onClick={redirectToAccountSettings}
              className='bg-emerald-500 text-white hover:bg-emerald-600 rounded px-4 py-2'
            >
              Account settings
            </button>
            <button
              onClick={handleSignOut}
              className='bg-rose-500 text-white hover:bg-rose-600 rounded px-4 py-2'
            >
              Log out
            </button>
          </div>
        </div>
      );
    } else {
      return <LoginForm />;
    }
  }

  return <div className='w-full'>{loading ? <Loader /> : pageData()}</div>;
}
