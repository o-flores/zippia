import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const circularProgressSize = 100;

const Loading = (): JSX.Element => (
  <Backdrop open>
    <CircularProgress color="primary" size={circularProgressSize} />
  </Backdrop>
);

export default Loading;
