import { useEffect } from "react";
import { useRouter } from "next/router";

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const token =
      typeof window !== "undefined" && localStorage.getItem("auth_token");

    useEffect(() => {
      if (!token) {
        router.push("/auth").then(() => router.reload());
      }
    }, [token]);

    return token ? <WrappedComponent {...props} /> : null;
  };

  Wrapper.getServerSideProps = WrappedComponent.getServerSideProps;

  return Wrapper;
};

export default withAuth;
