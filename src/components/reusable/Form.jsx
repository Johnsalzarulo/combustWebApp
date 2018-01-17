import React, { Component } from "react";

export default class Form extends Component {
  state = {};

  submitForm = e => {
    e.preventDefault();
    const { fields, onSubmit } = this.props;
    let formData = {};
    fields &&
      Object.keys(fields).forEach(field => {
        let val = this.state[field];
        if (val) {
          val = fields[field] === "number" ? parseInt(val, 0) : val;
          formData[camelCase(field)] = val;
        }
      });
    onSubmit(formData);
  };

  render() {
    const { fields, submitText, title, onCancel, cancelText } = this.props;

    return (
      <form onSubmit={this.submitForm} className="Form uk-width-medium">
        <legend className="uk-legend">{title}</legend>
        {fields &&
          Object.keys(fields).map(field => {
            const type = fields[field];
            return (
              <div className="uk-margin" key={field}>
                {type === "text" && (
                  <textarea
                    className="uk-textarea uk-form-width-large"
                    onChange={e => {
                      this.setState({ [field]: e.target.value });
                    }}
                    value={this.state[field] != null ? this.state[field] : ""}
                    placeholder={field}
                  />
                )}
                {type === "string" && (
                  <input
                    className="uk-input uk-form-width-medium"
                    onChange={e => {
                      this.setState({ [field]: e.target.value });
                    }}
                    placeholder={
                      field.charAt(0).toUpperCase() + field.substring(1)
                    }
                    type={
                      field === "password"
                        ? field
                        : type === "string" ? "text" : "number"
                    }
                  />
                )}
                {type === "boolean" && (
                  <label>
                    <input
                      className="uk-radio"
                      type="checkbox"
                      name={field}
                      onChange={e =>
                        this.setState({ [field]: e.target.checked })
                      }
                      checked={this.state[field]}
                    />{" "}
                    {field}
                  </label>
                )}
              </div>
            );
          })}
        <button
          className="uk-button uk-button-default uk-form-width-medium uk-margin-small-bottom"
          onClick={this.submitForm}
        >
          {submitText || "submit"}
        </button>
        {(onCancel || cancelText) && (
          <button
            className="uk-button uk-button-danger uk-form-width-medium uk-margin-small-bottom"
            onClick={onCancel}
          >
            {cancelText || "cancel"}
          </button>
        )}
        {this.props.children}
      </form>
    );
  }
}

const camelCase = str => {
  let string = str
    .toLowerCase()
    .replace(/[^A-Za-z0-9]/g, " ")
    .split(" ")
    .reduce((result, word) => result + capitalize(word.toLowerCase()));
  return string.charAt(0).toLowerCase() + string.slice(1);
};

const capitalize = str =>
  str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
