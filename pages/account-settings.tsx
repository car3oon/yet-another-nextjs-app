import { useCurrentUserQuery } from '@/generated/api';
import Loader from '@/components/Loader/Loader';
import { useRouter } from 'next/router';

export default function AccountSettings() {
  const router = useRouter();
  const { data, loading } = useCurrentUserQuery();
  const handleCancel = () => {
    router.push('/login');
  };

  return (
    <div>
      {loading && <Loader />}

      <div className='w-full mx-auto'>
        <form className='bg-white shadow-md rounded p-8'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block'>
                <span className={'block text-sm font-medium text-slate-700'}>
                  Fist Name
                </span>
                <input
                  className='border rounded bg-gray-50 px-4 py-2 w-full'
                  placeholder='Enter First name'
                  type='text'
                />
              </label>
            </div>
            <div>
              <label className='block'>
                <span className='block text-sm font-medium text-slate-700'>
                  Last Name
                </span>
                <input
                  className='border rounded bg-gray-50 px-4 py-2 w-full'
                  placeholder='Enter Last name'
                  type='text'
                />
              </label>
            </div>
            <div>
              <label className='block'>
                <span className='block text-sm font-medium text-slate-700'>
                  Email
                </span>
                <input
                  className='border rounded bg-gray-50 px-4 py-2 w-full'
                  placeholder='Enter email address'
                  type='email'
                />
              </label>
            </div>
          </div>
          <div className='w-full text-right space-x-4 mt-5'>
            <button
              onClick={handleCancel}
              className='bg-slate-100 text-emerald-500 hover:bg-slate-200 rounded px-4 py-2'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='bg-emerald-500 text-white hover:bg-emerald-600 rounded px-4 py-2'
            >
              Save
            </button>
          </div>
        </form>
        <div>errors</div>
      </div>
    </div>
  );
}
