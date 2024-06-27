'use client'
import { useFormStatus } from 'react-dom';
import { Button } from "@mui/material"

export default function CustomButton({ loadingLabel, label }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" variant="contained" color="success" sx={{ margin: '5px auto ', display: "block", disabled: { pending } }}>{pending ? loadingLabel : label}</Button>
    )
}