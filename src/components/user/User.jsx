import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function User({
                  firstName = "firstName",
                  lastName = "lastName",
                  email = "email",
                  addTag,
                  tags = null,
                  avatar
              }) {
    const [tag, setTag] = useState("");
    const navigate = useNavigate();

    const navigateToList = (e) => {
        e.preventDefault();
        navigate("/");
    }

    return (
        <form className="flex flex-col items-center" onSubmit={(e) => addTag(e, tag)}>
            <div className="flex items-center">
                <div>
                    <img src={avatar} alt="userava" width="76px" height="76px" />
                </div>
                <div>
                    <div className="flex gap-2">
                        <div>{firstName}</div>
                        <div>{lastName}</div>
                    </div>
                    <div>{email}</div>
                </div>
                {tags && <div>Tags</div>}
                {tags && tags.map((tag, index) => (
                    <div key={index}>{tag}</div>
                ))
                }
            </div>

            <div className="mt-[30px]">You can add multiple tags with a comma</div>
            <input
                type="text"
                id="tagname"
                name="tags"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="max-w-[431px] w-full border rounded border-bgray mt-[6px] py-[10px] pl-[12px]"
                placeholder="Add new Tag"/>
            <button
                type="submi"
                className=" mt-[24px] border border-bgray rounded flex items-center justify-center max-w-[431px] w-full py-[10px] text-base font-medium]">
                Add tag
            </button>
            <button
                className="max-w-[200px] border border-bgray rounded flex items-center justify-center w-full py-[10px] mt-[15px] hover:bg-base-bg"
                onClick={(e) => navigateToList(e)} type="button">Back
            </button>
        </form>
    );
}

export default User;