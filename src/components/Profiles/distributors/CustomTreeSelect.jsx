import React, {Component} from 'react';
import {TreeSelect} from 'antd';

const {SHOW_PARENT} = TreeSelect;
const treeData = [
    {
        title: 'CHAISES',
        value: '0-0',
        key: '0-0',
        children: [
            {
                title: 'FUR-JN',
                value: '0-0-0',
                key: '0-0-0',
            }, {
                title: 'FUR-NR',
                value: '0-0-1',
                key: '0-0-1',
            }, {
                title: 'FUR-BL',
                value: '0-0-2',
                key: '0-0-2',
            }, {
                title: 'CAL-NAT',
                value: '0-0-3',
                key: '0-0-3',
            }, {
                title: 'ADE-MR',
                value: '0-0-4',
                key: '0-0-4',
            }, {
                title: 'ADE-MR',
                value: '0-0-5',
                key: '0-0-5',
            },
        ],
    },
    {
        title: 'CHAISES 2',
        value: '0-1',
        key: '0-1',
        children: [
            {
                title: 'FUR-JN',
                value: '0-1-0',
                key: '0-1-0',
            },
            {
                title: 'FUR-JN',
                value: '0-1-1',
                key: '0-1-1',
            },
            {
                title: 'FUR-JN',
                value: '0-1-2',
                key: '0-1-2',
            },
        ],
    },
];

class CustomTreeSelect extends Component {
    state = {
        value: ['0-0'],
    };

    onChange = value => {
        console.log('onChange ', value);
        this.setState({value});
    };

    render() {
        const tProps = {
            treeData,
            value: this.state.value,
            onChange: this.onChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: 'Please select',
            style: {
                width: '100%',
            },
        };
        return (
            <React.Fragment>
                <TreeSelect dropdownClassName="custom-treeSelect" {...tProps} />
            </React.Fragment>
        );
    }
}

export default CustomTreeSelect;