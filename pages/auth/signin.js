import { providers, signIn } from "next-auth/client";

export default function SignIn({ providersProp }) {
  console.log({ providersProp });

  return (
    <div
      style={{
        display: "grid",
        textAlign: "center",
        alignItems: "center",
        marginTop: "100px",
        gap: "32px",
      }}
    >
      <h2>Sign In with OAuth Providers:</h2>
      {Object.values(providersProp).map((provider) => (
        <div key={provider.name}>
          <button
            style={{
              backgroundColor: "white",
              color: "var(--color-green-dark)",
              display: "flex",
              alignItems: "center",
              margin: "0 auto",
            }}
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: "/tracker",
              })
            }
          >
            {provider.name === "Google" ? (
              <img
                src="/iconGoogle.svg"
                style={{ width: "32px", marginRight: "8px" }}
              ></img>
            ) : (
              ""
            )}
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  try {
    const providersRes = await providers();
    return {
      props: { providersProp: providersRes },
    };
  } catch (e) {
    const providersRes = {
      google: {
        id: "google",
        name: "Google",
        type: "oauth",
        signinUrl: `${process.env.NEXTAUTH_URL}/api/auth/signin/google`,
        callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
      },
    };
    return { props: { providersProp: providersRes } };
  }
}
