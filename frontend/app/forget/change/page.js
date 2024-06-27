import CustomButton from "@/components/Button";
import Card from "@/components/Card";
import Password from "@/components/Password";

export default function Change() {
    return (
        <Card heading={"Reset Password"} caption={"enter new password"}>
            <form>
                <Password label={"New password"} placeholder={"enter new password"} />
                <Password label={"Re-enter password"} placeholder={"re enter the password"} />
                <CustomButton label={"Confirm"} />
            </form>
        </Card>
    )
}