import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Env } from '@env';
import { Contact, GetAllContactResponse } from '@/services/contact/types';

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({
    baseUrl: Env.API_URL,
  }),
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    // ? Query: Get All Contacts
    getContacts: builder.query<Contact[], void>({
      query: () => 'contact',
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Contacts' as const,
                id,
              })),
              { type: 'Contacts', id: 'LIST' },
            ]
          : [{ type: 'Contacts', id: 'LIST' }],
      // ? Transform the result to prevent nested data
      transformResponse: (response: GetAllContactResponse) => response.data,
    }),
  }),
});

export const { useGetContactsQuery } = contactApi;
