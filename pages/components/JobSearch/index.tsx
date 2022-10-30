import type { SelectChangeEvent } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type {
  BaseSyntheticEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { useState, useCallback } from "react";

interface JobSearchProps {
  setPostingDateRange: Dispatch<SetStateAction<string>>;
  postingDateRange: string;
  setCompanyCallback: (value: string) => void;
}

const fontSize = "12px";

const JobSearch = ({
  setPostingDateRange,
  postingDateRange,
  setCompanyCallback,
}: JobSearchProps): JSX.Element => {
  const [companyName, setCompanyName] = useState("");

  const onChangeCompanyName = useCallback(
    (event: ChangeEvent<{ value: string; name: string }>): void =>
      setCompanyName(event.target.value),
    []
  );

  const handlePostingDateRange = useCallback(
    (e: SelectChangeEvent<string>) => {
      setPostingDateRange(e.target.value);
    },
    [setPostingDateRange]
  );

  const handleClearFilter = useCallback(() => {
    setPostingDateRange("");
    setCompanyCallback("");
    setCompanyName("");
  }, [setPostingDateRange, setCompanyCallback]);

  const handleSearchButton = useCallback(
    (e: BaseSyntheticEvent) => {
      e.preventDefault();
      setCompanyCallback(companyName);
    },
    [companyName, setCompanyCallback]
  );

  return (
    <Stack
      direction="row"
      gap={4}
      justifyContent="space-between"
      sx={{ flexDirection: { xs: "column", sm: "row" } }}
    >
      <FormControl
        onSubmit={handleSearchButton}
        component="form"
        sx={{ display: "contents", flexDirection: "row" }}
      >
        <TextField
          size="small"
          type="text"
          fullWidth
          name="companyName"
          onChange={onChangeCompanyName}
          margin="normal"
          value={companyName}
          label="Company Name"
        />
      </FormControl>
      <FormControl sx={{ minWidth: "150px" }}>
        <InputLabel>
          <Typography>Date Posted</Typography>
        </InputLabel>
        <Select
          autoWidth
          label="Date Posted"
          onChange={handlePostingDateRange}
          value={postingDateRange}
        >
          <MenuItem value="1d">
            <Typography>Past Day</Typography>
          </MenuItem>
          <MenuItem value="3d">
            <Typography>Past 3 Days</Typography>
          </MenuItem>
          <MenuItem value="7d">
            <Typography>Past Week</Typography>
          </MenuItem>
          <MenuItem value="30d">
            <Typography>Past Month</Typography>
          </MenuItem>
        </Select>
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        size="large"
        onClick={handleSearchButton}
      >
        <Typography fontSize={fontSize}>Search</Typography>
      </Button>
      <Button
        type="button"
        variant="contained"
        id="clear"
        onClick={handleClearFilter}
        size="large"
      >
        <Typography fontSize={fontSize}>Clear</Typography>
      </Button>
    </Stack>
  );
};

export default JobSearch;
