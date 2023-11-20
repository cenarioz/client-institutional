import React, { Component } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

interface GoogleI {
  field: {
    name: string;
  };
  value: string;
  form: any;
  classes: any;
  label: any;
}

interface FormikPlacesAutoCompleteState {
  name: string;
  address: string;
}

class FormikPlacesAutoComplete extends Component<GoogleI, FormikPlacesAutoCompleteState> {
  constructor(props: GoogleI) {
    super(props);

    this.state = {
      name: props.field.name,
      address: props.value || "",
    };
  }

  handleError = (error: any) => {
    this.props.form.setFieldError(this.state.name, error);
  };

  handleChange = (address: string) => {
    this.setState(() => {
      this.props.form.setFieldTouched(`${this.state.name}.value`);
      this.props.form.setFieldTouched(`${this.state.name}.address`);
      this.props.form.setFieldValue(this.state.name, { value: address });
      return { address };
    });
  };

  handleSelect = (address: string) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        this.setState(() => {
          this.props.form.setFieldValue(this.state.name, {
            value: address,
            address,
            coordinates: latLng,
          });
          return { address };
        });
      })
      .catch((error) => this.props.form.setFieldError(this.state.name, error));
  };

  render() {
    const {
      field: { name, ...field }, // { name, value, onChange, onBlur }
      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
      classes,
      label,
      ...props
    } = this.props;

    const error = errors[name];
    const touch = touched[name];
    console.log(this.state);
    return (
      <PlacesAutocomplete
        {...props}
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        onError={this.handleError}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input form-control",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  // eslint-disable-next-line react/jsx-key
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default FormikPlacesAutoComplete;
