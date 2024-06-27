'use client'
import CustomButton from "@/components/Button";
import Card from "@/components/Card";
import InputField from "@/components/InputField";
import { Typography } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";

import ErrorMsg from "@/components/Errormsg";
import { useRouter } from 'next/navigation';


export default function Otp() {
    const router = useRouter();
    const email = localStorage.getItem('email');
    if (!email) {
        router.push('/');
        return;
    }
    async function formHandler(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        const data = Object.fromEntries(fd.entries());
        data.email = localStorage.getItem('email');
        const otpDetail = { otp: data.OTP, email: data.email };
        try {
            const res = await fetch('http://localhost:4000/verify/otp', {
                method: "POST",
                body: JSON.stringify({ ...otpDetail }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if (res.ok) {
                console.log(data.token);
                localStorage.setItem("token", data.token);
                return (router.push('/'));
            }

            if (!res.ok) return ({ message: 'invalid otp' })
        } catch (e) {
            console.log(e);
            return ({ message: e.message })
        }
    }

    return (
        <Card heading={'Validation'} caption={'enter Otp sent to your email'}>
            <form onSubmit={formHandler}>
                {/* <Typography sx={{ textAlign: "center" }}>{state.email}</Typography> */}
                <InputField label={'OTP'} placeholder={'Enter otp sent to email'} />
                <ErrorMsg message={""} />
                <CustomButton label={'Validate'} />

                <Link href="#" >Resend OTP</Link>
            </form>
        </Card>
    )
}