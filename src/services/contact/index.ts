import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Env } from '@env';
import {
  Contact,
  GetAllContactResponse,
  GetContactResponse,
} from '@/services/contact/types';

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

    // ? Query: Get a single Contact
    getContact: builder.query<Contact, string>({
      query: id => `contact/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Contacts', id }],
      // ? Transform the result to prevent nested data
      transformResponse: (response: GetContactResponse) => response.data,
    }),

    // ? Mutation: Delete contact
    deleteContact: builder.mutation<unknown, string>({
      query(id) {
        return {
          method: 'DELETE',
          url: `contact/${id}`,
        };
      },
      invalidatesTags: (_result, error) =>
        error ? [] : [{ type: 'Contacts', id: 'LIST' }],
    }),

    // ? Mutation: Edit contact
    editContact: builder.mutation<unknown, Contact>({
      query({ id, ...body }) {
        return {
          method: 'PUT',
          url: `contact/${id}`,
          body,
        };
      },

      invalidatesTags: (result, _error, { id }) =>
        result
          ? [
              { type: 'Contacts', id },
              { type: 'Contacts', id: 'LIST' },
            ]
          : [{ type: 'Contacts', id: 'LIST' }],

      /**
       * @see https://redux-toolkit.js.org/rtk-query/usage/manual-cache-updates
       *  */
      onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          //  Optimistic Updates
          contactApi.util.updateQueryData('getContact', id, draft => {
            Object.assign(draft, patch);
          }),
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactQuery,
  useDeleteContactMutation,
  useEditContactMutation,
} = contactApi;
