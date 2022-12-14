
import { Navigate } from 'react-router-dom';



const PrivateRoutes = ({ auth, children }) => {
  if (auth) {
    return children;
  } else {
    return <Navigate to={'/'} />
  }
}

const PublicRoutes = ({ auth, children }) => {
  if (!auth) {
    return children;
  } else {
    return <Navigate to={'/home'} />
  }
}


export { PrivateRoutes, PublicRoutes };
