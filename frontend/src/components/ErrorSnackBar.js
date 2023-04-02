import { Alert, AlertTitle, Snackbar } from "@mui/material"

const ErrorSnackBar = (props) => {
    return <Snackbar data-testid="error_snackbar" open={props.open} autoHideDuration={6000} onClose={props.onClose}>
        <Alert onClose={props.onClose} sx={{ margin: 'auto', maxWidth: '500px', textAlign: 'initial' }} variant="filled" severity="error">
            <AlertTitle>An error occured: {props.data}</AlertTitle>
        </Alert>
    </Snackbar>
}
export default ErrorSnackBar;