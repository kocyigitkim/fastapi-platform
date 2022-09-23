import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ProjectItem } from "../../components/ProjectItem";
import { useFastApi } from "../../contexts/FastApiManager";
import { useActions } from "../../hooks/useActions";

export function GettingStartedPage(props: any) {

    return (<div>
        <Grid container spacing={2} sx={{ height: '100vh' }}>
            <Grid item md={6} xs={12} sm={12}>
                <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
                    <Typography variant="h4">Welcome Back,</Typography>
                    <Divider sx={{ mt: 5 }} />
                    <NewProjectArea />
                </Paper>
            </Grid>
            <Grid item md={6} xs={12} sm={12}>
                <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
                    <RecentProjects />
                </Paper>
            </Grid>
        </Grid>



    </div>)
}

function RecentProjects(props: any) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const fastapi = useFastApi();

    useEffect(() => {
        console.log('init', fastapi);
        fastapi.recents().then((projects) => {
            console.log(projects);
            setProjects(projects);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }
    return (<div>
        <Typography sx={{ mb: 2 }} variant="h5">Recent(s)</Typography>
        <Divider />
        <Box mt={3}>
            {projects.map((project: any) => {
                return (<ProjectItem project={project} />)
            })}
        </Box>
    </div>)
}

function NewProjectArea(props: any) {
    const actions = useActions();

    return (<>
        <Grid container mt={2}>
            <Button sx={{ minWidth: 150, margin: 0.5 }} variant="contained"
            onClick={actions.redirect.bind(null, "/getting-started/new-project")}
            >Create Project</Button>
            <Button sx={{ minWidth: 150, margin: 0.5 }}>Open Existing</Button>
        </Grid>
    </>);
}