// routes
import Router from './routes';
// components
import MotionLazyContainer from './components/animate/MotionLazyContainer';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <MotionLazyContainer>
      <Router />
    </MotionLazyContainer>
  );
}
