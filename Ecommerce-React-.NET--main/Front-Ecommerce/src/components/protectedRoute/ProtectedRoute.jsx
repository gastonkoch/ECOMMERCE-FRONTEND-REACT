import MainLayout from '../mainLayout/MainLayout';
import Unauthorize from '../unauthorize/Unauthorize';
import PropTypes from "prop-types";
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext';
import { useContext } from 'react';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  if (!user) {
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


ProtectedRoute.propTypes = {
  children: PropTypes.object
};

export default ProtectedRoute;
