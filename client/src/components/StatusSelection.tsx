import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Chip } from "@material-ui/core";
import { bytesToSize } from "../Utils/function";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

type propsType = {
  color: string | undefined;
  label: string;
  currentStatus: string;
};

export default function StatusSelection({
  color,
  label,
  currentStatus,
}: propsType) {
  const classes = useStyles();
  const [status, setStatus] = React.useState("");
  const statusArray = ["Not Started", "In Progress", "Done"].filter(
    (status) => status !== currentStatus && status !== "Not Started"
  );

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log(event.target.value);
    setStatus(event.target.value as string);
  };
  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          value={status}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {statusArray.map((status, i) => (
            <MenuItem value={i * 10}>
              <Chip
                color={status !== "Done" ? "primary" : "secondary"}
                label={status}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
