import Head from "next/head";

export default function Error() {
  return (
    <>
      <Head>
        <title>Error</title>
      </Head>
      <div>
        <h1>Oops! Something went wrong.</h1>
        <p>We're sorry, but an unexpected error occurred.</p>
      </div>
    </>
  );
}
