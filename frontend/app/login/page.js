'use client'
import { useFormState } from 'react-dom';
import { Stack } from "@mui/material";
import Card from "@/components/Card";
import InputField from "@/components/InputField";
import Password from "@/components/Password";
import CustomButton from "@/components/Button";
import Link from "next/link";
import { submitHandler } from "@/lib/submitHandler";
import InvalidPassword from '@/components/InvalidPassword';
import ErrorMsg from '@/components/Errormsg';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function Login() {
    const [state, formAction] = useFormState(submitHandler, { message: null });
    const router = useRouter();
    useEffect(() => {
        if (state.message === 'ok') {
            console.log(state.token);
            localStorage.setItem("token", state.token);
            router.push('/');
        }
    }, [state.message])
    return (
        <Card heading={'Login'} caption={'Enter your credentials'}>
            <form action={formAction}>
                <InputField label={'Email'} placeholder={'Enter your email'} />
                <Password label={"Password"} placeholder={"Enter your password"} />

                {state.message && state.message !== "Invalid password" && <ErrorMsg message={state.message} />}
                {state.message && state.message == "Invalid password" &&
                    <InvalidPassword message={state.message} />
                }
                <CustomButton label={'Login'} loadingLabel={'Logging'} />
                <Stack direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={9}>
                    <Link href="/register" >New user?</Link>
                    <Link href="/forget" >forgot password?</Link>
                </Stack>

            </form>
        </Card>
    )
}