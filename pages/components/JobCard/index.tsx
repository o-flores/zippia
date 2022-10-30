import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { memo } from "react";

// i don't know anything about the return values of the api, so this way i avoid unhandled errors
type JobCardProps = {
  title: string | undefined;
  description: string | undefined;
  companyName: string | undefined;
};

const tagsPattern = /(<([^>]+)>)/g;

const JobCard = ({
  title,
  description,
  companyName,
}: JobCardProps): JSX.Element => (
  <Grid item xs={12} sm={5} md={3} lg={3}>
    <Stack gap={1}>
      <Card variant="elevation" sx={{ background: "#fbfbfb" }}>
        <CardContent
          sx={{
            maxHeight: 150,
            overflow: "auto",
            // removing scrollbar styles
            "&::-webkit-scrollbar": {
              width: 0,
              height: 0,
              display: "none",
              WebkitAppearance: "none",
            },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          <Stack rowGap={1}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body1">{companyName}</Typography>
            <Typography variant="body2" color="text.secondary">
              {description?.replace(tagsPattern, "")}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  </Grid>
);

// memorize each component to improve performance
export default memo(JobCard);
