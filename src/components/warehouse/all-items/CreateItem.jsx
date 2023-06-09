import React, {Component} from 'react';
import ItemSidebar from "../../sidebar/warehouse/ItemSidebar";
import RelatedImages from "./RelatedImages";
import {StockInformation} from "./StockInformation";
import {ArticleForm} from "./ArticleForm";
import {withTranslation} from "react-i18next";

class CreateItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
    }

    steps = () => {
        const {t} = this.props;

        return [
            {
                title: t('item_details'),
                content: <ArticleForm next={() => this.next()}/>,
            },
            {
                title: t('stock_info'),
                content: <StockInformation next={() => this.next()} prev={() => this.prev()}/>,
            },
            {
                title: t('related_images'),
                content: <RelatedImages prev={() => this.prev()}/>,
            },
        ]
    };

    next() {
        const current = this.state.current + 1;
        this.setState({current});
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({current});
    }

    render() {

        const {current} = this.state;
        return (
            <React.Fragment>
                <ItemSidebar {...this.props} current={current} steps={this.steps()}/>
                <div className="steps-right-side-div bg-white float-right">
                    <div className="steps-content">{this.steps[current].content}</div>
                </div>
            </React.Fragment>
        );
    }
}

export default (withTranslation('common')(CreateItem));
