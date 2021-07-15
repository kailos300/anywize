import * as React from "react";
import { useTranslation } from "react-i18next";
import {
  TextField,
  Select as MaterialSelect,
  Checkbox as MaterialCheckbox,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const getErrorForName = (errors, name) => {
  if (!errors) {
    return null;
  }

  if (errors[name]) {
    return errors[name];
  }

  if (name.includes(".")) {
    const split = name.split(".");

    if (errors[split[0]]) {
      let tmp = errors[split[0]];
      for (let i = 1; i < split.length; i += 1) {
        if (tmp[split[i]]) {
          tmp = tmp[split[i]];
        } else {
          tmp = null;
          break;
        }
      }

      if (tmp) {
        return tmp;
      }
    }
  }

  return null;
};

const getHelpOrError = (help, errors, name, t) => {
  const error = getErrorForName(errors, name);

  if (error) {
    return t(error);
  }

  if (help) {
    return help;
  }

  return null;
};

export const Password = (props) => {
  const [showPwd, setShowPwd] = React.useState(false);
  const { type, label, name, errors, value, help, ...rest } = props;
  const { t } = useTranslation();

  const changeShowPwd = () => {
    setShowPwd(!showPwd);
  };

  return (
    <TextField
      label={label || ""}
      margin="normal"
      name={name}
      type={showPwd ? "text" : "password"}
      value={value || ""}
      fullWidth={true}
      helperText={getHelpOrError(help, errors, name, t)}
      error={!!getErrorForName(errors, name)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={changeShowPwd}
            >
              {showPwd ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...rest}
    />
  );
};

export const Input = (props) => {
  const { type, label, name, errors, value, help, ...rest } = props;
  const { t } = useTranslation();

  return (
    <TextField
      label={label || ""}
      margin="dense"
      name={name}
      type={type || "text"}
      value={value || ""}
      fullWidth={true}
      helperText={getHelpOrError(help, errors, name, t)}
      error={!!getErrorForName(errors, name)}
      {...rest}
    />
  );
};

export const InputOnlyNumbers = (props) => {
  const { type, label, name, errors, value, help, onChange, ...rest } = props;
  const { t } = useTranslation();

  return (
    <TextField
      label={label || ""}
      margin="dense"
      name={name}
      type={type || "text"}
      value={value || ""}
      fullWidth={true}
      helperText={getHelpOrError(help, errors, name, t)}
      error={!!getErrorForName(errors, name)}
      onChange={(e) => {
        if (!/^[0-9+-\s]*$/.test(e.target.value)) {
          return;
        }

        return onChange(e);
      }}
      {...rest}
    />
  );
};

export const Select = (props) => {
  const { type, label, name, errors, value, options, help, margin, ...rest } =
    props;
  const { t } = useTranslation();

  return (
    <FormControl fullWidth margin={props.margin || "none"}>
      {!!label && <InputLabel>{label || ""}</InputLabel>}
      <MaterialSelect
        margin={margin || "none"}
        name={name}
        value={value || ""}
        fullWidth={true}
        error={!!getErrorForName(errors, name)}
        {...rest}
      >
        {options.map((o, i) => (
          <MenuItem key={i} value={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </MaterialSelect>
      <FormHelperText error={!!getErrorForName(errors, name)}>
        <span>{getHelpOrError(help, errors, name, t)}</span>
      </FormHelperText>
    </FormControl>
  );
};

export const Textarea = (props) => {
  const { label, name, value, help, errors, ...rest } = props;
  const { t } = useTranslation();

  return (
    <TextField
      label={label || ""}
      margin="normal"
      name={name}
      type={"text"}
      value={value || ""}
      fullWidth={true}
      helperText={getHelpOrError(help, errors, name, t)}
      error={!!getErrorForName(errors, name)}
      {...rest}
      multiline={true}
      rows={3}
    />
  );
};

export const Checkbox = (props) => {
  const { label, name, value, ...rest } = props;

  return (
    <MaterialCheckbox checked={value} value={value} name={name} {...rest} />
  );
};

export function ColorInput(props) {
  const { type, label, name, errors, value, help, onChange, ...rest } = props;
  const { t } = useTranslation();

  function handleChange(e) {
    e.preventDefault();
    e.persist();

    if (e.target.value) {
      onChange(e);
    }
  }

  return (
    <TextField
      label={label || ""}
      margin="normal"
      name={name}
      type={type || "text"}
      value={value || ""}
      fullWidth={true}
      helperText={getHelpOrError(help, errors, name, t)}
      error={!!getErrorForName(errors, name)}
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            <input
              value={value || ""}
              type="color"
              name={name}
              onChange={handleChange}
            />
          </InputAdornment>
        ),
      }}
      {...rest}
    />
  );
}
