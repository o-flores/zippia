import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export type JobType = {
  jobs: Array<Record<string, string>>;
  remainingJobs: number;
  totalJobs: number;
};

export type JobsReturnType = {
  response: JobType;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> => {
  const { numJobs, postingDateRange, companyName } = req.query;

  const { data } = await axios.post<JobType>(
    "https://www.zippia.com/api/jobs/",
    {
      companySkills: true,
      dismissedListingHashes: [],
      fetchJobDesc: true,
      jobTitle: "Business Analyst",
      locations: [],
      numJobs: 20,
      previousListingHashes: [],
      postingDateRange,
    }
  );

  const response = data;
  const filteredJobs = response.jobs.slice(0, Number(numJobs));
  response.jobs = filteredJobs;

  if (companyName) {
    const filteredJobsByCompanyName = response.jobs.filter(
      (job) => job.companyName === companyName
    );
    response.jobs = filteredJobsByCompanyName;
  }

  return res.status(200).json({ response });
};
