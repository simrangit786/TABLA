import ClientTypeFilter from "../ClientTypeFilter";


export default class TableClientTypeFilter extends ClientTypeFilter {
    handleChange = (value) => {
        this.setState({value});
        this.props.onChange(value)
    };
}