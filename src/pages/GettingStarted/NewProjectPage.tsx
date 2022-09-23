import { Button, Divider, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import { useComplexState } from "../../hooks/useComplexState";
import * as yup from 'yup';
import { yupValidate } from "../../utils/yupValidate";
import { Close } from "@mui/icons-material";
import { useActions } from "../../hooks/useActions";
import { useFastApi } from "../../contexts/FastApiManager";

export function NewProjectPage(props: any) {
    const fastapi = useFastApi();
    const state = useComplexState();
    const actions = useActions();
    const name = state.field("name", "");
    const description = state.field("description", "");
    const path = state.field("path", "");
    const validation = yupValidate(yup.object().shape({
        name: yup.string().required(),
        description: yup.string().optional(),
        path: yup.string().required()
    }), state.value);
    return (<>
        <Grid container justifyContent="center">
            <Paper elevation={20} sx={{ p: 2, mt: 4, width: '100%', maxWidth: '600px', borderRadius: 2 }}>
                <Grid container alignItems={"center"} sx={{ mb: 3 }}>
                    <Grid item flex={1}>
                        <Typography variant="h6">New Project</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={actions.redirect.bind(null, "/")}><Close /></IconButton>
                    </Grid>
                </Grid>

                <TextField sx={{ mb: 1 }} label="Name" fullWidth {...name} />
                <TextField sx={{ mb: 1 }} label="Description" fullWidth multiline rows={4} {...description} />
                <Grid container sx={{ mt: 1 }}>
                    <Grid item flex={1}>
                        <TextField label="Path" fullWidth {...path} disabled />
                    </Grid>
                    <Grid item display={"flex"}>
                        <Button onClick={() => {
                            path.browse();
                        }} variant="contained" sx={{ ml: 2, flex: 1 }}>Browse</Button>
                    </Grid>
                </Grid>
                <Grid container sx={{ mt: 4 }} justifyContent="flex-end">
                    <Button onClick={async () => {
                        await fastapi.create({
                            name: name.value,
                            description: description.value,
                            path: path.value
                        }).catch(console.error);
                        actions.redirect("/development");
                    }} disabled={!validation.success} variant="contained" sx={{ p: 2, px: 6 }}>Create</Button>
                </Grid>
            </Paper>
        </Grid >
    </>);
}
