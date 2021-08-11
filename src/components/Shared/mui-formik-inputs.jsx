import * as React from 'react';
import { useTranslation } from 'react-i18next';
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
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import MUIAutocomplete from '@material-ui/lab/Autocomplete';

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
      inputProps={{ autoComplete: 'off' }}
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
      inputProps={{ autoComplete: 'off' }}
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
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
          },
          getContentAnchorEl: null
        }}
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
      inputProps={{ autoComplete: 'off' }}
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
              autoComplete="off"
            />
          </InputAdornment>
        ),
      }}
      {...rest}
    />
  );
}

export const Autocomplete = ({
  name,
  value,
  label,
  help,
  errors,
  options,
  required,
  onChange,
  settings,
  onBlur,
  disabled,
}) => {
  const { t } = useTranslation();
  const opts = {
    disableClearable: false,
    freeSolo: false,
    valueProp: 'value',
    labelProp: 'label',
    filterOptions: null,
    disableInputWhenNoOptions: true,
    ...settings,
  };

  const getValue = (o) => {
    if (typeof opts.valueProp === 'function') {
      return opts.valueProp(o);
    }

    return o[opts.valueProp];
  };

  const getLabel = (o) => {
    if (typeof opts.labelProp === 'function') {
      return opts.labelProp(o);
    }

    return o[opts.labelProp];
  };

  // this prevents a bug when we have an input with
  // options fetched from the api. The input loads before the api
  // and later on the currently selected item is not properly marked.
  if (!options.length && opts.disableInputWhenNoOptions) {
    return (
      <Select
        name={name}
        value={value}
        label={label}
        help={help}
        errors={errors}
        options={[{ label: t('No options'), value: null, disabled: true }]}
        required={required}
        onChange={null}
        onBlur={null}
        disabled={disabled}
      />
    );
  }

  return (
    <FormControl fullWidth margin="none">
      <MUIAutocomplete
        id='new-select-autocomplete'
        fullWidth
        value={value ? options.find((o) => getValue(o) === value) : null}
        options={options}
        disableClearable={opts.disableClearable}
        onChange={(event, newValue) => {
          onChange(newValue);
        }}
        onBlur={onBlur}
        disabled={disabled}
        freeSolo={opts.freeSolo}
        getOptionLabel={(option) => getLabel(option)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={t(label)}
            required={required}
            inputProps={{
              ...params.inputProps,
              autoComplete: `off`,
            }}
            margin="dense"
            error={!!getHelpOrError(null, errors, name, t)}
            helperText={getHelpOrError(help, errors, name, t)}
          />
        )}
        {...(opts.filterOptions ? { filterOptions: opts.filterOptions } : {})}
      />
    </FormControl>
  );
};