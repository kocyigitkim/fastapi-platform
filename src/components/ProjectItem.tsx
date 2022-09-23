import { Avatar, Button, Grid, Typography } from "@mui/material";

export function ProjectItem(props: any) {
    const project = props.project;
    const name = project.name;
    const path = project.path;
    const avatar = [name[0], name[name.length - 1]].filter(v => Boolean(v)).map(k => k.toUpperCase()).join('');
    return (<Button variant="text" style={{ display: 'flex', width: '100%' }} sx={{ mb: 1, mt: 1 }}>
        <Grid container alignItems="center" spacing={2}>
            <Grid item>
                <Avatar>{avatar}</Avatar>
            </Grid>
            <Grid item>
                <div>
                    <Typography variant="h6" sx={{textAlign:'left'}}>{name}</Typography>
                </div>
                <div>
                    <Typography variant="subtitle2" sx={{textTransform: 'none'}} color="GrayText">{path}</Typography>
                </div>
            </Grid>
        </Grid>
    </Button>)
}