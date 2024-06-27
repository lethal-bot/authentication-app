import { TextField } from "@mui/material"
export default function InputField({ label, placeholder }) {
    return (
        <TextField fullWidth name={label} label={label} margin="dense" placeholder={placeholder} />
    )
}