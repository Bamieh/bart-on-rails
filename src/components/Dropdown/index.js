import React from 'react'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import './index.scss'

const propTypes = {
  onChange: React.PropTypes.func,
  value: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  name: React.PropTypes.string,
  options: React.PropTypes.array,
}
const defaultProps = {
  value: undefined,
  onChange() {},
  placeholder: "placeholder text",
  name: 'form-field-name',
  options: [],
}

const Dropdown = ({options, value, onChange, placeholder, name, ...passDown}) => (
  <Select
    name={name}
    value={value}
    options={options}
    onChange={onChange}
    placeholder={placeholder}
    {...passDown}
  />
)

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;

export default Dropdown
