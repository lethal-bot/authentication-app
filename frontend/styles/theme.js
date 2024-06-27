import { createTheme } from "@mui/material"
import { red } from "@mui/material/colors";
const theme = createTheme({
    typography: {
        error: {
            color: red[500]
        },
        subtitle1: {
            color: red[500],
            lineHeight: 0.5,
            fontSize: 12,
        }
    }
})
export default theme;