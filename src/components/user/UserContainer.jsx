import React from 'react';
import User from './User';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useUpdateContactTagMutation } from "../../api/users-api";

function UserContainer() {
    const {id} = useParams();
    const [updateTag, isLoading] = useUpdateContactTagMutation();
    const navigate = useNavigate();

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

        try {
            await updateTag({id, tags}).unwrap();
            navigate(`/`);
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