import SalesRepresentativeFilter from "../salesRepresentativeFilter";


export default class TablaSalesRepresentativeFilter extends SalesRepresentativeFilter {
    handleChange = (value) => {
        this.setState({value});
        this.props.onChange(value)
    };
}