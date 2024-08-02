import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ManageUser from "../manage-user/ManageUser";
import { ReactComponent as Close } from "../../assets/icons/close.svg";

function Home({data, contacts, deleteContact, getData}) {
    const navigate = useNavigate();

    const navigateToCard = (id, firstName, lastName, email, avatar) => {
        navigate(`user/${id}?firstname=${firstName}&lastname=${lastName}&email=${email}&avatar=${avatar}`);
    }

    useEffect(() => {
        if (contacts && contacts.length) {
            console.log(contacts)
        }
    }, []);

    if (!contacts || contacts.length === 0) {
        return <div>error</div>
    }
    return (
        <div className="flex justify-center">
            <div className="max-w-[1280px] min-w-[400px] w-full flex max-lg:flex-col max-lg:items-center max-lg:px-[34px]">
                <div className="flex mr-[38px] top-0 sticky max-lg:static z-10">
                    <ManageUser getData={getData}/>
                </div>

                <div className="w-full max-w-[558px]">
                    <div className="text-xl font-medium">Contacts</div>
                    <div className="mt-[5px]">
                        {contacts.map((contact, index) => (
                            <div
                                key={contact.id}
                                className="bg-base-bg h-[158px] w-full pt-[16px] relative mt-[16px]">
                                <button className="absolute top-[10px] right-[10px]" onClick={() => deleteContact(contact.id)}>
                                    <Close/>
                                </button>
                                <div>
                                    <div className="flex">
                                        <div className="flex  items-center">
                                            <div className="mr-2 w-[54px] ml-[16px] hover:cursor-pointer"
                                                 onClick={() => navigateToCard(contact.id, contact.fields?.firstName, contact.fields?.lastName, contact.fields.email, contact.avatar_url)}>
                                                <img src={contact.avatar_url} alt="avatar"/>
                                            </div>
                                            <div>
                                                <div className="flex gap-1">
                                                    <div
                                                        className="font-medium text-base">{contact.fields?.["first name"]}</div>
                                                    <div
                                                        className="font-medium text-base">{contact.fields?.["last name"]}</div>
                                                </div>

                                                <div className="font-medium text-base">{contact.fields.email}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {contact.tags.length >= 1 && <div className="flex gap-2 ml-[80px] mt-[12px] flex-wrap">
                                        {contact.tags?.map((tag, index) => (
                                            <div key={index} className="flex bg-tag-bg px-[12px] rounded">{tag.tag}</div>
                                        ))}
                                    </div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;