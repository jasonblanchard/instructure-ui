import React, { Children, Component, PropTypes } from 'react'
import CustomPropTypes from '../../util/CustomPropTypes'
import classnames from 'classnames'
import themeable from '../../util/themeable'
import RadioInput from './RadioInput'

import styles from './RadioInputGroup.css'
import themeVariables from './theme/RadioInputGroup'
import themeStyles from './theme/RadioInputGroup.css'

/**
  A RadioInputGroup is a group of RadioInput components. It will handle setting
  the name property on the RadioInput components for you and will set the selected item
  based on the `value` property.

  ```jsx_example
  <RadioInputGroup name="fruit" defaultValue="banana" description="Select a fruit">
    <RadioInput label="Apple" value="apple" />
    <RadioInput label="Orange" value="orange" />
    <RadioInput label="Banana" value="banana" />
  </RadioInputGroup>
  ```

  Set the `style` prop to `toggle` to have the RadioInputGroup display as a toggle switch.
  If the `style` prop is set to `toggle`, you can set the `size` prop to produce toggles of
  different sizes. As with the [Button](#Button) component and the input components, `medium` is the default.

  ```jsx_example
  <div>
   <RadioInputGroup
      name="featuresm"
      defaultValue="off"
      description="Small-size"
      style="toggle"
      size="small">
      <RadioInput label="Off" value="off" />
      <RadioInput label="Allow" value="allow" />
      <RadioInput label="On" value="on" />
    </RadioInputGroup>
    <br />
    <RadioInputGroup
      name="featuremed"
      defaultValue="off"
      description="Medium-size (default)"
      style="toggle">
      <RadioInput label="Off" value="off" />
      <RadioInput label="Allow" value="allow" />
      <RadioInput label="On" value="on" />
    </RadioInputGroup>
    <br />
    <RadioInputGroup
      name="featurelg"
      defaultValue="off"
      description="Large-size"
      style="toggle"
      size="large">
      <RadioInput label="Off" value="off" />
      <RadioInput label="Allow" value="allow" />
      <RadioInput label="On" value="on" />
    </RadioInputGroup>
  </div>
  ```

  Use the `context` prop on individual RadioInput components to encourage
  users to make good decisions - or simply as an additional way to convey to sighted
  users that a feature is on/active through color. Also note that toggles have a max-width: If your
  options have walls of text, please use the default RadioInputGroup style.

  ```jsx_example
  <RadioInputGroup name="security" defaultValue="none" description="Security settings" style="toggle">
    <RadioInput label="None" value="none" context="danger" />
    <RadioInput label="Password" value="password" />
    <RadioInput label="Two-factor authentication" value="auth" context="success" />
  </RadioInputGroup>
  ```

  Setting the `disabled` prop to `true` will disable the entire RadioInputGroup.

  ```jsx_example
  <RadioInputGroup
    name="fruits"
    description="Fruits"
    defaultValue="orange"
    disabled
  >
    <RadioInput label="Apple" value="apple" />
    <RadioInput label="Orange" value="orange" />
    <RadioInput label="Banana" value="banana" />
  </RadioInputGroup>
  ```

  ```jsx_example
  <RadioInputGroup name="feature" defaultValue="off" description="Super-awesome feature" style="toggle" disabled>
    <RadioInput label="Off" value="off" />
    <RadioInput label="Allow" value="allow" />
    <RadioInput label="On" value="on" />
  </RadioInputGroup>
  ```

  Or disable an individual RadioInput component via its `disabled` prop.

  ```jsx_example
  <RadioInputGroup
    name="fruits"
    defaultValue="banana"
    description="Fruits"
  >
    <RadioInput label="Apple" value="apple" />
    <RadioInput label="Orange" value="orange" disabled />
    <RadioInput label="Banana" value="banana" />
  </RadioInputGroup>
  ```

  ```jsx_example
  <RadioInputGroup name="feature" defaultValue="off" description="Super-awesome feature" style="toggle">
    <RadioInput label="Off" value="off" />
    <RadioInput label="Allow" value="allow" />
    <RadioInput label="On" value="on" disabled />
  </RadioInputGroup>
  ```

  If you would like to make the description visible only to screen readers you can use the
  [ScreenReaderContent](#ScreenReaderContent) component.

  ```jsx_example
  <RadioInputGroup name="fruit" defaultValue="banana" description={
    <ScreenReaderContent>Select a fruit</ScreenReaderContent>
    }>
    <RadioInput label="Apple" value="apple" />
    <RadioInput label="Orange" value="orange" />
    <RadioInput label="Banana" value="banana" />
  </RadioInputGroup>
  ```

  To render a RadioInput with a screen reader only label you can use the [ScreenReaderContent](#ScreenReaderContent)
  component. Then you can pass additional content (that is not linked to the input as a label) as children.

  ```jsx_example
  <RadioInputGroup name="fruit" defaultValue="banana" description="A list of fruits (select your favorite)">
    <RadioInput value="Apple" label={<div>
        <ScreenReaderContent>Apple</ScreenReaderContent>
        <TextInput label={
          <ScreenReaderContent>Edit fruit</ScreenReaderContent>
          } defaultValue="Apple"/>
      </div>} />
      <RadioInput value="banana" label={<div>
        <ScreenReaderContent>Banana</ScreenReaderContent>
        <TextInput label={
          <ScreenReaderContent>Edit fruit</ScreenReaderContent>
          } defaultValue="Banana"/>
      </div>} />
          <RadioInput value="Orange" label={<div>
        <ScreenReaderContent>Orange</ScreenReaderContent>
        <TextInput label={
          <ScreenReaderContent>Edit fruit</ScreenReaderContent>
          } defaultValue="Orange"/>
      </div>} />
  </RadioInputGroup>
  ```
**/

@themeable(themeVariables, themeStyles)
export default class RadioInputGroup extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.node.isRequired,
    /**
    * value to set on initial render
    */
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    /**
    * the selected value (must be accompanied by an `onChange` prop)
    */
    value: CustomPropTypes.controllable(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])),
    /**
    * when used with the `value` prop, the component will not control its own state
    */
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    errors: PropTypes.array,
    /**
    * children of type `RadioInput`
    */
    children: CustomPropTypes.validChildren([RadioInput]),
    style: PropTypes.oneOf(['simple', 'toggle']),
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  };

  static defaultProps = {
    disabled: false,
    style: 'simple',
    size: 'medium'
  };

  constructor (props) {
    super()

    if (props.value === undefined) {
      this.state = {
        value: props.defaultValue
      }
    }
  }

  handleChange = (e) => {
    const value = e.target.value

    if (this.props.disabled) {
      e.preventDefault()
      return
    }

    if (this.props.value === undefined) {
      this.setState({value})
    }

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(value)
    }
  };

  get value () {
    return (this.props.value === undefined) ? this.state.value : this.props.value
  }

  getCheckedInput () {
    let checked

    Children.forEach(this.props.children, (child, index) => {
      if (child && child.type === RadioInput && this.value === child.props.value) {
        checked = child
      }
    })

    return checked
  }

  renderChildren () {
    const {
      children,
      name,
      style,
      size,
      disabled
    } = this.props

    // This adds the passed in name property to each RadioInput component
    // and checks the input whose value matches the value property
    return Children.map(children, (child) => {
      if (child && child.type === RadioInput) {
        return (
          <RadioInput {...child.props}
            name={name}
            disabled={disabled || child.props.disabled}
            style={style}
            size={size}
            checked={this.value === child.props.value}
            onChange={this.handleChange} />
        )
      } else {
        return child // PropType validation should handle errors
      }
    })
  }

  renderErrors () {
    const {errors} = this.props
    if (errors) {
      return errors.map((msg, i) => {
        return <div key={'error' + i} className={styles.errors}>{msg}</div>
      })
    }
  }

  renderDescription () {
    const {description} = this.props
    if (description) {
      return <div className={styles.description}>{description}</div>
    }
  }

  render () {
    const checkedInput = this.getCheckedInput()
    const context = checkedInput && checkedInput.props.context
    const classes = {
      [styles.root]: true,
      [styles[this.props.style]]: true,
      [styles[context]]: context
    }

    return (
      <fieldset
        className={classnames(classes)}
        aria-disabled={this.props.disabled ? 'true' : null}>
        <legend className={styles.label}>
          {this.renderDescription()}
          {this.renderErrors()}
        </legend>
        <div className={styles.layout}>
          {this.renderChildren()}
        </div>
      </fieldset>
    )
  }
}