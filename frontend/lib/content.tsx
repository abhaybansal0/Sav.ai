import axios from "axios";
import { cookies } from "next/headers";


const BASE_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_DOMAIN

export async function getDashboardCourses() {
    const cookieStore = await cookies();
    const token = cookieStore.get('Authorization')?.value;

    const res = await axios.get(`${BASE_BACKEND_URL}/api/courses/dashboard`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
    )

    if (!res) return null;


    return res.data;
}

export async function getCourses() {
    const cookieStore = await cookies();
    const token = cookieStore.get('Authorization')?.value;

    const res = await axios.get(`${BASE_BACKEND_URL}/api/courses`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
    )

    if (!res) return null;

    return res.data;
}



export async function getUnitsBySubId(SubId: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get('Authorization')?.value;

    const res = await axios.get(`${BASE_BACKEND_URL}/api/units/${SubId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
    )

    if (!res) return null;

    return res.data;
}


export async function getLessonsByUnitId(UnitId: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get('Authorization')?.value;

    const res = await axios.get(`${BASE_BACKEND_URL}/api/lessons/${UnitId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
    )

    if (!res || !res.data.unit) return null;

    return res.data;
}