import { Typography, ThemeProvider } from "@mui/material";
import theme from "@/styles/theme";

export default function ErrorMsg({ message }) {
    return (
        <ThemeProvider theme={theme}>
            <Typography variant="error">{message}</Typography>
        </ThemeProvider>
    )
}