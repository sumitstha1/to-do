import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../utils/auth';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated()) {
        router.push('/user/login'); // Redirect to login page if not authenticated
      }
    }, []);

    return isAuthenticated() ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default withAuth;
