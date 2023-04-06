import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Admin() {
    const URL = process.env.NEXT_PUBLIC_CLIENT_URL;
    const { adminSeat, setAdminSeat } = useState({});
    const { asPath, pathname } = useRouter();
    console.log("Current URL: " + URL + pathname)

    return <div>Ngademin</div>;
}
