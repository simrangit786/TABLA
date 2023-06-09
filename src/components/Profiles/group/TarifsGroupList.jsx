import React, { Component } from 'react'
import { withTranslation } from 'react-i18next';
import {Empty, Input, Pagination, Table} from 'antd';
import { Link } from 'react-router-dom';
import {reverse} from "named-urls";
import { routes } from '../../../controller/routes';
import { methods } from '../../../controller/Global';
import {Image as Images} from "../../Images";
import {history} from "../../../controller/history";

const {Search} = Input;
const pagination = Pagination;
pagination.pageSize = 25;

export class TarifsGroupList extends Component {
  state = {
    data: [ {
      'name': "Nom du composant",
      "groupe_tarifaire":"Tarif France",
      "family":"FURTIF",
      'category':'CHAISES',
      'reference':'FUR-BL'
    }],
    pagination: pagination,
    loading: false,
    params: {}
};

columns = () => {
  const {t} = this.props;
  return [
    {
      title: t('name'),
      dataIndex: 'name',
      sorter: true,
      key: 'name',
    },
    {
      title: t('groupe_tarifaire'),
      dataIndex: 'groupe_tarifaire',
      sorter: true,
      key: 'groupe_tarifaire',
    },
    {
      title: t('family'),
      dataIndex: 'family',
      sorter: true,
      key: 'family',
    },
    {
      title: t('category'),
      dataIndex: 'category',
      sorter: true,
      key: 'category',
    },
    {
      title: t('reference'),
      dataIndex: 'reference',
      sorter: true,
      key: 'reference',
    }
  ];
};
render() {
    const {t} = this.props;
    return (
      <div id="main-content" className="main-content-div float-right position-relative px-4 py-5 mt-5">
      <div className="container-fluid">
          <div className="row w-100 m-0 common-heading-details mb-3">
              <div className="col-sm-6 col-md-7 col-12 p-0">
                  <div className="row mx-0 flex-align-center">
                      <h4 className="mb-0 font-weight-bold text-uppercase mr-4"> {t('tarifs')}</h4>
                      <Link to={reverse(routes.dashboard.profiles.tarifs.method, {
                          method: methods.create    
                      })}
                            type="primary"
                            className="plus-btn text-uppercase main-btn-tag flex-align-center text-white font-weight-bold pl-2 pr-3">
                          <img src={Images.plus_icon_white}/> {t('create_a_rate')}</Link>
                  </div>
              </div>
              <div className="col-sm-6 col-md-5 col-12 p-0">
                  <div className="row mx-0 filter-row">
                      <div className="top-f-row-search">
                          <Search
                              placeholder={t('search')}
                              onSearch={value => this.fetch({search: value})}
                              className="ml-1 flex-align-center"
                          />
                      </div>
                  </div>
              </div>
          </div>
          <div className="row w-100 m-0">
              <div className="col-12 p-0">
                  <div className="listing-table table-responsive when-pagination-true">
                      <Table
                          className="responsive-table table table-hover table-custom"
                          columns={this.columns()}
                          dataSource={this.state.data}
                          loading={this.state.loading}
                          pagination={this.state.pagination}
                          onChange={this.handleChange}
                          rowKey={data => `profile_${data.id}`}
                          size="middle"
                          locale={{
                              emptyText: (
                                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('no_data')}/>)
                          }}
                          onRow={(record) => {
                              return {
                                  onClick: () => {
                                      history.push(reverse(routes.dashboard.profiles.tarifs.method, {
                                          method: methods.view,
                                          id: record.id,
                                      }))
                                  },
                              };
                          }}
                      />
                  </div>
              </div>
          </div>
      </div>
  </div>
    )
  }
}

export default (withTranslation('common')(TarifsGroupList));