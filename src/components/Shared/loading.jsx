import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

export default () => (
  <Box style={{ height: '100vh', backgroundColor: '#121212' }} p={2} textAlign="center">
    <CircularProgress color="primary" />
  </Box>
);
