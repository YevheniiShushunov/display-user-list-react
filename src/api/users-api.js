import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1/",
        credentials: "same-origin",
        prepareHeaders: (headers) => {
            const token = "VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn";
            if (token) {
                headers.set("Authorization",`Bearer ${token}`);
                headers.set("Content-Type", "application/json");
                headers.set( "Referrer-Policy", "strict-origin-when-cross-origin");
            }
            return headers;
        },
    }),

    endpoints: (builder) => ({
        getContacts: builder.query({
            query: () => ({
                url: 'contacts',
                params: {
                    sort: 'created:desc',
                },
            }),
            transformResponse: (response) => {
                return response.resources.map(item => {
                    const transformed = { ...item };
                    if (item.fields) {
                        transformed.fields = {};
                        for (const [key, value] of Object.entries(item.fields)) {
                            transformed.fields[key] = value.map(field => field.value).join(', ');
                        }
                    }
                    return transformed;
                });
            }
        }),
        getContact: builder.query({
            query: (id) => `contacts/${id}`
        }),
        createContact: builder.mutation({
            query: (newContact) => ({
                url: 'contact',
                method: 'POST',
                body: newContact,
            }),
        }),
        updateContactTag: builder.mutation({
            query: ({id, ...updateTag}) => ({
                url: `contacts/${id}/tags`,
                method: 'PUT',
                body: updateTag,
            }),
        }),
        deleteContact: builder.mutation({
            query: (id) => ({
                url: `contact/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useGetContactsQuery,
    useGetContactQuery,
    useCreateContactMutation,
    useUpdateContactTagMutation,
    useDeleteContactMutation,
} = usersApi;