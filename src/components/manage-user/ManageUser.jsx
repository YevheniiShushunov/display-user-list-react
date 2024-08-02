import React from 'react';
import { generateUser } from "../../functions/generate-user";
import { useCreateContactMutation } from "../../api/users-api";
import { isEmail, checkEmptyFields } from "../../functions/validation";

function ManageUser({getData}) {
    const [user, setUser] = React.useState(generateUser());
    const [createContact, isLoading, refetch] = useCreateContactMutation();
    const [emailError, setEmailError] = React.useState(false);

    const onFirstNameChange = (e) => {
        const {value} = e.target;
        setUser((prevState) => (
            {
                ...prevState,
                "first name": [{...prevState["first name"][0], value}],
            }
        ))
    }

    const onLastNameChange = (e) => {
        const {value} = e.target;
        setUser((prevState) => (
            {
                ...prevState,
                "last name": [{...prevState["last name"][0], value}],
            }
        ))
    }

    const onEmailChange = (e) => {
        const {value} = e.target;
        setUser((prevState) => (
            {
                ...prevState,
                email: [{...prevState.email[0], value}],
            }
        ))
    }

    const onAddUser = async (e) => {
        e.preventDefault();
        const email = user.email[0].value;

        if (!checkEmptyFields(user)) {
            return false
        }

        if (!isEmail(email)) {
            return setEmailError(true);
        }

        setEmailError(false)

        const data = {
            fields: user,
            record_type: 'person',
            privacy: {
                edit: null,
                read: null,
            },
            owner_id: null,
        }
        console.log(data);
        try {
            await createContact(data).unwrap();
            getData();
        } catch (e) {
            console.log(e);
        }

        setEmailError(false)
    }

    return (
        <form className="max-w-[280px] h-[386px] sticky top-0 flex flex-col z-10" onSubmit={onAddUser}>
            <h2 className="text-xl font-medium">Create Contact</h2>
            <div className="flex flex-col">
                <label htmlFor="first-name" className="text-xs">First name</label>
                <input type="text" id="first-name"
                       className="border border-bgray rounded-lg px-[14px] py-[12px] mt-[6px]"
                       name="firstName"
                       value={user["first name"][0].value}
                       onChange={onFirstNameChange}/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="first-name" className="text-xs">Last name</label>
                <input type="text" id="first-name"
                       name="lastName"
                       className="border border-bgray rounded-lg px-[14px] py-[12px] mt-[6px] w-[280px]"
                       value={user["last name"][0].value}
                       onChange={onLastNameChange}/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="email" className="text-xs">Email</label>
                <input type="text" id="email"
                       name="email"
                       className="border border-bgray rounded-lg px-[14px] py-[12px] mt-[6px] w-[280px]"
                       value={user.email[0].value}
                       onChange={onEmailChange}/>
                {emailError && <div className="text-red-600">The field must contain an email address</div>}
            </div>
            <button
                className="uppercase
                rounded border
                border-bgray
                flex
                justify-center
                items-center
                w-[280px]
                mt-[20px]
                py-[10px]"
                type="submit">Add contact
            </button>
        </form>
    );
}

export default ManageUser;