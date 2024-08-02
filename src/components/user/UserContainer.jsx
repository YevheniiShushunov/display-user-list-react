import React from 'react';
import User from './User';
import { useParams, useLocation } from "react-router-dom";
import { useUpdateContactTagMutation } from "../../api/users-api";

function UserContainer() {
    const {id} = useParams();
    const [updateTag, isLoading] = useUpdateContactTagMutation();

    //The user's request by its ID for the user doesn't work, so I made a transfer through the parameters
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();
    const firstName = query.get('firstName');
    const lastName = query.get('lastName');
    const email = query.get('email');
    const avatar = query.get('avatar');

    const addTag = async (e, data) => {
        e.preventDefault();
        const tags = data.split(',');
        console.log(id, tags)
        try {
            await updateTag({id, tags}).unwrap()
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <User
                id={id}
                firstName={firstName}
                lastName={lastName}
                email={email}
                addTag={addTag}
                isLoding={isLoading}
                avatar={avatar}/>
        </div>
    );
}

export default UserContainer;