import WarehouseSupplierFilter from "../warehouseSupplierFilter";


export default class TableWarehouseSupplierFilter extends WarehouseSupplierFilter {
    handleChange = (value) => {
        this.setState({value});
        this.props.onChange(value)
    };
}