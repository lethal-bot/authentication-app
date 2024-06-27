import { Typography, ThemeProvider, Stack } from "@mui/material"
import theme from "@/styles/theme"
export default function InvalidPassword({ message }) {
    return (
        <Stack spacing={1} sx={{ marginBottom: '10px' }}>
            <ThemeProvider theme={theme}>
                <Typography variant='error'>{message}</Typography>
                <Typography variant='subtitle1'>Min length required 6</Typography>
                <Typography variant='subtitle1'>Must contain one Uppercase alphabet</Typography>
                <Typography variant='subtitle1'>Must contain one alphanumeric</Typography>
            </ThemeProvider>
        </Stack>
    )
}