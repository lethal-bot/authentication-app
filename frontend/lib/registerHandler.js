'use server'
import { isValidEmail, isValidPassword } from "./Check";



export async function registerHandler(prevState, formData) {

    const registerDetail = {
        name: formData.get('Name'),
        email: formData.get('Email'),
        password: formData.get('Password')
    };

    if (!isValidEmail(registerDetail.email)) {
        return { message: 'Invalid email' }
    }
    if (!isValidPassword(registerDetail.password)) {
        return ({
            message: 'Invalid password'
        })
    }

    try {
        const res = await fetch('http://localhost:4000/users', {
            method: "POST",
            body: JSON.stringify({ ...registerDetail }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.ok) return ({ message: 'ok', email: registerDetail.email })

        if (!res.ok) return ({ message: 'registration failed' })
    } catch (e) {
        console.log(e);
        return ({ message: e.message })
    }
    // redirect('/otp')



}