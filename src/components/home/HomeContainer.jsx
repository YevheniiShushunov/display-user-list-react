import React from 'react';
import Home from './Home';
import { useGetContactsQuery, useDeleteContactMutation } from "../../api/users-api";

function HomeContainer() {
    const {data: contacts, error, isLoading, refetch} = useGetContactsQuery();
    const [deleteContact] = useDeleteContactMutation();

    const onDelete = async (id) => {
        try {
            await deleteContact(id).unwrap();
            refetch();
        } catch (error) {
            console.log(error)
        }
    }

    const getData = () => {
        return refetch()
    }

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <Home isLoading={isLoading} contacts={contacts} deleteContact={onDelete} getData={getData} />
        </div>
    );
}

export default HomeContainer;