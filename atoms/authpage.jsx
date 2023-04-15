import React, { useEffect,useState } from "react";
import { useRouter } from "next/router";

const withAuth = (WrappedComponent) => {
  

  const Wrapper = (props) => {
    const [renderCount, setRenderCount] = useState(0);
    const router = useRouter(0);
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      useEffect(() => {
        if (!token) {
          router.push("/auth").then(()=>
            router.reload()
          );
          
        }
      },);

      if (!token) {
        return null;
      }
    }

    return <WrappedComponent {...props} />;
  };

  if (WrappedComponent.getServerSideProps) {
    Wrapper.getServerSideProps = WrappedComponent.getServerSideProps;
  }

  return Wrapper;
};

export default withAuth;
