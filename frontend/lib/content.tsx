import axios from "axios";
import { cookies } from "next/headers";

axios.defaults.withCredentials = true;

const BASE_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_DOMAIN

const getTokens = async () => {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('Authorization')?.value;
    // const csrfToken = cookieStore.get('XSRF-TOKEN')?.value;

    // rebuild the cookie header so axios will send both cookies back
    // const cookieHeader = cookieStore
    //     .getAll()
    //     .map(c => `${c.name}=${c.value}`)
    //     .join('; ');

    return { authToken };
}


export async function getDashboardCourses() {

    const { authToken } = await getTokens();
    if (!authToken) return null;

    const res = await axios.get(`${BASE_BACKEND_URL}/api/courses/dashboard`,
        {
            headers: {
                Authorization: `Bearer ${authToken}`
            },
        }
    )

    if (!res) return null;


    return res.data;
}

export async function getCourses() {
    const { authToken } = await getTokens();
    if (!authToken) return null;


    const res = await axios.get(`${BASE_BACKEND_URL}/api/courses`,
        {
            headers: {
                Authorization: `Bearer ${authToken}`
            },
        }
    )

    if (!res) return null;

    return res.data;
}



export async function getUnitsBySubId(SubId: string) {
    const { authToken } = await getTokens();
    if (!authToken) return null;


    const res = await axios.get(`${BASE_BACKEND_URL}/api/units/${SubId}`,
        {
            headers: {
                Authorization: `Bearer ${authToken}`
            },
        }
    )

    if (!res) return null;

    return res.data;
}


export async function getLessonsByUnitId(UnitId: string) {
    const { authToken } = await getTokens();
    if (!authToken) return null;


    const res = await axios.get(`${BASE_BACKEND_URL}/api/lessons/${UnitId}`,
        {
            headers: {
                Authorization: `Bearer ${authToken}`
            },
        }
    )

    if (!res || !res.data.unit) return null;

    return res.data;
}


export async function getLessonbyLessonId(lessonId: string) {
    const { authToken } = await getTokens();
    if (!authToken) return null;


    const res = await axios.get(`${BASE_BACKEND_URL}/api/lessons/lesson/${lessonId}`,
        {
            headers: {
                Authorization: `Bearer ${authToken}`
            },
        }
    )

    if (!res || !res.data.lesson) return null;

    return res.data;
}

    