import { RouterProvider } from 'react-router-dom';
import { SessionContext as AuthProvider } from 'contexts/AuthContext';
import { CssBaseline } from '@mui/material';
import router from "./routes";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const App = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AuthProvider>
                <CssBaseline>
                    <>
                        <RouterProvider router={router} />
                    </>
                </CssBaseline>
            </AuthProvider>
        </LocalizationProvider>
    );
}

export default App;