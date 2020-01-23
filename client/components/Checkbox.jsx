import React, { Component } from 'react';


class Checkbox extends Component {
    constructor(props){
        super(props) 
    }

    // toggleCheckboxChange() {
    //     console.log('in toggle checkbox change')
    //     const { onCheckboxChange, label } = this.props;
    //     this.setState({ isChecked: !isChecked });
    //     onCheckboxChange(label);
    //   }

    render() {
    const { label, onCheckboxChange, value } = this.props;
    return (
      <div className="checkbox">
          <input
            type="checkbox"
            name={label}
            value={value}
            onChange={() => onCheckboxChange(label)}
          />
          {label}
      </div>
    )
    }   
}

export default Checkbox;