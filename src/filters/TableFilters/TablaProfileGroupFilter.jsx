import ProfileGroupFilter from "../ProfileGroupFilter";


export default class TablaProfileGroupFilter extends ProfileGroupFilter {
    handleChange = (value) => {
        this.setState({value});
        this.props.onChange(value)
    };
}