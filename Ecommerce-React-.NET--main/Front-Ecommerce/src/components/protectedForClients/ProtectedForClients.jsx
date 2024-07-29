import MainLayout from '../mainLayout/MainLayout';
import Unauthorize from '../unauthorize/Unauthorize';
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';
import { useContext } from 'react';

const ProtectedForClients = ({ children }) => {
    const { user } = useContext(AuthenticationContext);

    if (!user || (user && user.userType === 0)) {
        return (
            <MainLayout>
                <Unauthorize />
            </MainLayout>
        )
    }
    return (
        <MainLayout children={children}>
        </MainLayout>
    )
};

export default ProtectedForClients;
