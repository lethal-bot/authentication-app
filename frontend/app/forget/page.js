'use client'
import CustomButton from "@/components/Button";
import Card from "@/components/Card";
import InputField from "@/components/InputField";

export default function Forget() {

    function submitHandler(event) {
        event.preventDefault();
    }


    return (
        <Card heading={'Forget Password'} caption={'Enter registered email'}>
            <form onSubmit={submitHandler}>
                <InputField label={'Email'} placeholder={'Enter your email'} />
                <CustomButton label={'Get Otp'} loadingLabel={'Sending'} />
            </form>
        </Card>
    )
}