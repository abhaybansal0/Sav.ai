import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios, { isAxiosError } from "axios";

axios.defaults.withCredentials = true;


const BASE_BACKEND_URL = process.env.BACKEND_DOMAIN

export async function getUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get('Authorization')?.value;
    // const csrfToken = cookieStore.get('XSRF-TOKEN')?.value;

    // const cookieHeader = cookieStore.getAll()
    //     .map(c => `${c.name}=${c.value}`)
    //     .join('; ');

    if (!token) {
        return null;
    }

    try {
        const res = await axios.get(`${BASE_BACKEND_URL}/api/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
                // 'X-XSRF-TOKEN': csrfToken!,
                // cookie: cookieHeader,
            },
        })


        if (!res) return null;

        return res.data;

    } catch (error: unknown) {
        if (isAxiosError(error)) {
            console.log('Error while getting User Info: ', error.message)
            return null;
        } else if (error instanceof Error) {
            console.error("Something went wrong:", error.message);
        }
        else {
            // totally unexpected
            console.error("Unknown error", error);
        }
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
