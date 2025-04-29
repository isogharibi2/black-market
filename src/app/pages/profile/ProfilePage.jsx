import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react'

export default function ProfilePage() {

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("verified")) {
            navigate("/auth/register");
        }

        if (localStorage.getItem("admin")) {
            navigate("/profile/admin/new-product");
        }else {
            navigate("/profile/user")
        }
    }, [navigate]);

    return (
        <div>
            welcome to the profile Page
        </div>
    )
}
