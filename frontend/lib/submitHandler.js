'use server'
import { isValidEmail, isValidPassword } from "./Check";
import { redirect } from "next/navigation";





export async function submitHandler(prevState, formData) {

    const loginDetail = {
        email: formData.get('Email'),
        password: formData.get('Password')
    };
    if (!isValidEmail(loginDetail.email)) {
        return { message: 'Invalid email' }
    }
    if (!isValidPassword(loginDetail.password)) {
        return ({
            message: 'Invalid password'
        })
    }

    try {
        const res = await fetch('http://localhost:4000/users/login', {
            method: "POST",
            body: JSON.stringify({ ...loginDetail }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        if (res.ok) return ({ message: 'ok', token: data.token })
        if (!res.ok) return ({ message: 'login failed' })
    } catch (e) {
        return ({ message: e.message })
    }
    redirect('/');
}