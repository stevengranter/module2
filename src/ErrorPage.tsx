// import { useRouteError } from "react-router-dom";

// interface RouteError {
//   statusText?: string;
//   message: string;
// }

function ErrorPage() {
  // const error = useRouteError() as RouteError;

  // console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <em>
          {/* {error.statusText || error.message} */}
        </em>
      </p>
    </div>
  );
}

export default ErrorPage;
