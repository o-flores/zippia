import useSWR from "swr";

import fetchers from "../../../utils/fetchers";

const Jobs = (): JSX.Element => {
  const { data, error } = useSWR("/api/jobs", fetchers.getJSON);
  const isLoading = !error && !data;

  console.log(data);

  if (isLoading) return <div>loading...</div>;

  return <div>Jobs</div>;
};

export default Jobs;
