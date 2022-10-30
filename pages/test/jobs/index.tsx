import { Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import { useCallback, useState } from "react";
import useSWR from "swr";

import fetchers from "../../../utils/fetchers";
import type { JobsReturnType } from "../../api/jobs";
import JobCard from "../../components/JobCard";
import JobSearch from "../../components/JobSearch";
import Loading from "../../components/Loading";

const numJobs = 10;

const Jobs = (): JSX.Element => {
  const [companyName, setCompanyName] = useState("");
  const [postingDateRange, setPostingDateRange] = useState<string>("");
  // SWR is a strategy to first return the data from cache (stale), then send the fetch request (revalidate), and finally come with the up-to-date data.
  const { data, error } = useSWR<JobsReturnType>(
    `/api/jobs?numJobs=${numJobs}&postingDateRange=${postingDateRange}&companyName=${companyName}`,
    fetchers.getJSON
  );
  const isLoading = !error && !data;

  const setCompanyCallback = useCallback((value: string) => {
    setCompanyName(value);
  }, []);

  return (
    <>
      <AppBar component="nav">
        <Toolbar>
          <Image
            src="https://static.zippia.com/ui-router/logo/full.png"
            alt="Zippia logo"
            width={160}
            height={36}
            priority
          />
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box component="main">
        <Container>
          <Stack spacing={3} marginTop={4}>
            {error ? (
              <Typography variant="h5">
                Unexpected error, please try again later!
              </Typography>
            ) : (
              <>
                <JobSearch
                  setPostingDateRange={setPostingDateRange}
                  postingDateRange={postingDateRange}
                  setCompanyCallback={setCompanyCallback}
                />
                <Grid
                  container
                  alignItems="center"
                  rowGap={3}
                  columnGap={2}
                  justifyContent="space-between"
                >
                  {isLoading ? (
                    <Loading />
                  ) : (
                    data?.response.jobs.map((job) => (
                      <JobCard
                        title={job.jobTitle}
                        description={job.jobDescription}
                        companyName={job.companyName}
                        key={job.jobId}
                      />
                    ))
                  )}
                </Grid>
              </>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Jobs;
