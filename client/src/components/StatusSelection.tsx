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
};

export default function StatusSelection({ color, label }: propsType) {
  const classes = useStyles();
  const [age, setAge] = React.useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };
  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <Chip label="Not Started" />
          </MenuItem>
          <MenuItem value={20}>
            <Chip color="primary" label="In Progress" />
          </MenuItem>
          <MenuItem value={30}>
            <Chip color="secondary" label="Done" />
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
