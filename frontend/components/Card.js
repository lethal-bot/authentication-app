import { Grid, Avatar, Paper, Typography } from "@mui/material";
export default function Card({ heading, caption, children }) {
    const paperStyle = { padding: '30px 20px', width: '300px', margin: '40px auto' }
    const headerStyle = { margin: '0' };
    const avatarStyle = { background: 'blue' }
    return (
        < Grid >
            <Paper elevation={20} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}>

                    </Avatar>
                    <h2 style={headerStyle}>{heading}</h2>
                    <Typography variant="caption">{caption}</Typography>
                </Grid>
                {children}
            </Paper>
        </Grid >
    )
}