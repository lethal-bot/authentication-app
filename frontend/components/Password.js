'use client'
import { useState } from "react";
import { InputLabel, OutlinedInput, InputAdornment, IconButton, FormControl } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
export default function Password({ label, placeholder }) {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <FormControl sx={{ width: '100%' }} variant="outlined" margin="dense">
            <InputLabel htmlFor="outlined-adornment-password" >{label}</InputLabel >
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                name={label}
                placeholder={placeholder}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
            />
        </FormControl>
    )
}