import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios";


const BASE_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_DOMAIN

export async function getUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get('Authorization')?.value;

    if (!token) {
        return null;
    }

    try {
        const res = await axios.get(`${BASE_BACKEND_URL}/api/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!res) return null;

        return res.data;

    } catch (error) {
        return null;
    }
}

export async function getUserWithAuth() {

    const userData = await getUser();

    if (!userData) {
        return redirect('/login');
    }


    return userData;
}

export async function fetchWithAuth(endpoint: string, options = {}) {
    const cookieStore = cookies();
    const token = (await cookieStore).get('Authorization')?.value;

    const res = await axios.post(`${BASE_BACKEND_URL}${endpoint}`, {
        ...options,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    return res;

}
