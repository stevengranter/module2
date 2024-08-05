import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <div id="error-page">
      <h1>Ooops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p><em>
        {error.statusText || error.message} </em></p>
    </div>
  );
}
export default ErrorPage;