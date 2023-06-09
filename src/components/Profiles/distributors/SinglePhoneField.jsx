import React, {Component} from 'react';
import {Input} from "antd";

class SinglePhoneField extends Component {

    constructor(props) {
        super(props);
        props.phoneFields.forEach(item => {
            this[item.field] = React.createRef();
            this.state = {
                fields_set: false,
            }
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.value !== this.props.value) {
            let value = this.props.value || [];
            this.props.phoneFields.forEach(obj => {
                let val = [value.slice(0, obj.max), value.slice(obj.max)];
                value = val[1];
                this.setState({[obj.field]: val[0]})
            });
            this.setState({fields_set: true})
        }
    }

    reset = () => {
        this.setState({fields_set: false});
    };

    onPhoneChange = (e) => {
        const value = e.target.value;
        const current = parseInt(e.currentTarget.getAttribute('current'));
        const {phoneFields} = this.props;
        this.setState({[phoneFields[current].field]: value}, () => {
            if (value.length >= phoneFields[current].max && current < phoneFields.length - 1) {
                this[phoneFields[current + 1].field].current.focus();
            }
            // if (current === phoneFields.length - 1 && value.length === phoneFields[current].max) {
            this.props.onChange(phoneFields.map(key => this.state[key.field]).join(""));
            // }
        });
    };

    render() {
        return (
            <div className="row mx-0">
                {this.props.phoneFields.map((item, index) =>
                    (<div key={index} className="phone-break-fields pl-0 pr-1">
                        <Input type="text" ref={this[item.field]} name={item.field} maxLength={item.max} current={index}
                               value={this.state[item.field]}
                               placeholder={Array(item.max).fill("X").join('')}
                               onChange={this.onPhoneChange}/>
                    </div>)
                )}
            </div>
        );
    }
}

export default SinglePhoneField;
