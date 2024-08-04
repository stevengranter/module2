// React Router components
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <div id='outlet'>
      ROOT
      <Outlet />
    </div >
  );
}
