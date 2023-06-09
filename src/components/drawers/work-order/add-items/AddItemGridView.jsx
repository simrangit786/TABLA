import React, {Component} from 'react';
import {SingleItemCard} from "./singleItemCard";


class AddItemGridView extends Component {

    render() {
        const items = this.props.items.filter(o => o.variant.length > 0);
        const {location} = this.props;
        return (
            <React.Fragment>
                <div className="row mx-0 list-item-card-row">
                    {items.map((d, index) =>
                        <SingleItemCard key={`product_card_${index}`} product={d} location={location}/>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default AddItemGridView;
