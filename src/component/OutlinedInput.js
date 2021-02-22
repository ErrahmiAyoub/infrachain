import React from "react";
import Box from "@material-ui/core/Box";
import MuiTextField from "@material-ui/core/TextField";
import { FormControl } from "@material-ui/core";
import { fieldToTextField } from "formik-material-ui";

export default function OutlinedTextField(props) {
  return (
    <Box margin={1}>
      <FormControl fullWidth>
        <MuiTextField
          {...fieldToTextField(props)}
          variant="outlined"
          required
        />
      </FormControl>
    </Box>
  );
}
