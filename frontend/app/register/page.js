'use client'
import Card from "@/components/Card";
import Password from "@/components/Password";
import CustomButton from "@/components/Button";
import InputField from "@/components/InputField";
import Link from "next/link";
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation';
import { registerHandler } from "@/lib/registerHandler";
import ErrorMsg from "@/components/Errormsg";
import InvalidPassword from "@/components/InvalidPassword";
import { useEffect } from "react";

export default function Register() {
    const [state, formAction] = useFormState(registerHandler, { message: null });
    const router = useRouter();
    useEffect(() => {
        if (state.message === 'ok') {
            console.log(state.email);
            localStorage.setItem("email", state.email);
            router.push('/otp');
        }
    }, [state.message])
    return (
        <Card heading={'Register'} caption={'Please create your account'}>
            <form action={formAction}>
                <InputField label={'Name'} placeholder={'Enter your name'} />
                <InputField label={'Email'} placeholder={'Enter your email'} />
                <Password label={"Password"} placeholder={"Enter your password"} />
                {state.message && state.message !== "ok" && state.message !== "Invalid password" && <ErrorMsg message={state.message} />}
                {state.message && state.message !== "ok" && state.message == "Invalid password" &&
                    <InvalidPassword message={state.message} />
                }
                <CustomButton label={'Register'} loadingLabel={'Registering'} />
                <Link href={"/login"}>Already have an account?
                </Link>
            </form>
        </Card>
    );
}