import ItemCategoryFilter from "../itemCategoryFilter";


export default class CategoryItemFilter extends ItemCategoryFilter {
    handleChange = (value) => {
        this.setState({value});
        this.props.onChange(value)
    };
}