"use client";

import { getUserCS } from "@/nextfirejs/client/auth";

export default function ClientPage() {
    const { currentUser } = getUserCS();
    return (
        <div>
            Client Page {JSON.stringify(currentUser?.email)}
        </div>
    )
}