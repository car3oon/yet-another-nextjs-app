import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useAddChannelMutation } from '@/generated/api';

import { toast } from 'react-toastify';

const addChannelFormSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  currencyCode: z.string().min(1),
  defaultCountry: z.string().min(1, { message: 'The field is required' }),
});

type addChannelFormSchemaType = z.infer<typeof addChannelFormSchema>;

const AddChannel: NextPage = () => {
  const router = useRouter();
  const handleCancel = () => {
    router.push('/channels');
  };

  const [addChannel] = useAddChannelMutation();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<addChannelFormSchemaType>({
    resolver: zodResolver(addChannelFormSchema),
  });

  const onSubmit: SubmitHandler<addChannelFormSchemaType> = async (
    formData,
  ) => {
    const { data } = await addChannel({
      variables: {
        name: formData.name,
        slug: formData.slug,
        currencyCode: formData.currencyCode,
        defaultCountry: formData.defaultCountry,
      },
      update: (cache, { data }) => {
        const channel = data?.channelCreate?.channel;

        if (!channel) return;

        cache.modify({
          fields: {
            channel: (_, { toReference }) => toReference(channel),
          },
        });
      },
    });

    if (data?.channelCreate?.errors.length) {
      const errorMsg = `${data.channelCreate?.errors?.[0].field}: ${data.channelCreate?.errors?.[0].message}`;

      toast.error(errorMsg, {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });

      return;
    }

    if (data?.channelCreate?.channel) {
      router.push('/channels');
    }
  };

  return (
    <div>
      <h1 className='text-lg font-bold mb-5'>Add Channel</h1>
      <form
        className='bg-white shadow-md rounded p-8'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block'>
              <span className={'block text-sm font-medium text-slate-700'}>
                Name
              </span>
              <input
                className='border rounded bg-gray-50 px-4 py-2 w-full'
                placeholder='Enter name'
                type='text'
                disabled={isSubmitting}
                {...register('name')}
              />
            </label>
            {errors.name && (
              <p className='text-red-600 text-sm mt-1'>{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className='block'>
              <span className={'block text-sm font-medium text-slate-700'}>
                Slug
              </span>
              <input
                className='border rounded bg-gray-50 px-4 py-2 w-full'
                placeholder='Enter slug'
                type='text'
                disabled={isSubmitting}
                {...register('slug')}
              />
            </label>
            {errors.slug && (
              <p className='text-red-600 text-sm mt-1'>{errors.slug.message}</p>
            )}
          </div>
          <div>
            <label className='block'>
              <span className={'block text-sm font-medium text-slate-700'}>
                Currency Code
              </span>
              <input
                className='border rounded bg-gray-50 px-4 py-2 w-full'
                placeholder='Enter currency code'
                type='text'
                disabled={isSubmitting}
                {...register('currencyCode')}
              />
            </label>
            {errors.currencyCode && (
              <p className='text-red-600 text-sm mt-1'>
                {errors.currencyCode.message}
              </p>
            )}
          </div>
          <div>
            <label className='block'>
              <span className={'block text-sm font-medium text-slate-700'}>
                Default Country
              </span>
              <input
                className='border rounded bg-gray-50 px-4 py-2 w-full'
                placeholder='Enter default country'
                type='text'
                disabled={isSubmitting}
                {...register('defaultCountry')}
              />
            </label>
            {errors.defaultCountry && (
              <p className='text-red-600 text-sm mt-1'>
                {errors.defaultCountry.message}
              </p>
            )}
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
    </div>
  );
};

export default AddChannel;
