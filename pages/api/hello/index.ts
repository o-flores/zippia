import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async (
  _req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void | NextApiResponse> => {
  return res.status(200).json({ name: "John Doe" });
};
