import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  console.error({ error });

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Unexpected error has ocurred, sorry</p>
    </div>
  );
};
