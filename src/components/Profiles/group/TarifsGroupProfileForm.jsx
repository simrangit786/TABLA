import React, { Component } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { groupPost, groupUpdate } from "../../../controller/API/profileApi";
import { Image as Images } from "../../Images";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import { showErrors } from "../../../controller/utils";
import { methods } from "../../../controller/Global";
import ConfirmPopup from "../../modal/ConfirmPopup";
import { history } from "../../../controller/history";
import { reverse } from "named-urls";
import { routes } from "../../../controller/routes";
import { CreateTarifs } from '../../drawers/TarifsGroupDrawer';

class TarifsGroupProfileFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmGroup: false,
            visibleTarifsDrawer: false,
        };
    }

    // handleSubmit = () => {
    //     this.props.form.validateFields((err, values) => {
    //         if (!err) {
    //             const {group} = this.props;
    //             if (group) {
    //                 groupUpdate(group.id, values)
    //                     .then(response => {
    //                         this.confirmGroupVisible(true)
    //                     }).catch(err => showErrors(err.response.data, this.props.form))
    //             } else {
    //                 groupPost(values)
    //                     .then(response => {
    //                         this.confirmGroupVisible(true)
    //                     }).catch(err => showErrors(err.response.data, this.props.form))
    //             }
    //         }
    //     })
    // };

    // confirmGroupVisible = (visible) => {
    //     this.setState({confirmGroup: visible})
    // };
    visibleTarifsCreateDrawer = (visible) => {
        this.setState({
            visibleTarifsDrawer: visible
        })
    };

    render() {
        const { t, group } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { params } = this.props.match;
        const { confirmGroup } = this.state;
        const { Option } = Select;
        return (
            <React.Fragment>
                <div className="row mx-0 steps-main-row">
                    <div className="col-12">
                        <h6 className="all-heading-div text-uppercase font-weight-bold mb-4 pb-2">{t('tariff_information')}</h6>
                    </div>
                    <div className="col-12">
                        <Form className="main-form">
                            <div className="row">
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <Form.Item label={t('nom')}>
                                        {getFieldDecorator('nom', {
                                            rules: [{ required: true, message: t('please_input') }],
                                        })(
                                            <Input autoFocus placeholder={t('nom')} />,
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <Form.Item label={t('groupe_tarifaire')}>
                                        {getFieldDecorator('groupe_tarifaire', {
                                            rules: [{ required: true, message: t('please_input') }],
                                        })(
                                            < Select defaultValue="Tarif_France">
                                                <Option value="Tarif_France">Tarif France</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <Form.Item label={t('category')}>
                                        {getFieldDecorator('category', {
                                            rules: [{ required: true, message: t('please_input') }],
                                        })(
                                            < Select defaultValue="CHAISES">
                                                <Option value="CHAISES">CHAISES</Option>
                                            </Select>,
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <Form.Item label={t('family')}>
                                        {getFieldDecorator('family', {
                                            rules: [{ required: true, message: t('please_input') }],
                                        })(
                                            < Select defaultValue="FURTIF">
                                                <Option value="FURTIF">FURTIF</Option>
                                            </Select>,
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <Form.Item label={t('code_sku')}>
                                        {getFieldDecorator('code_sku', {
                                            rules: [{ required: true, message: t('please_input') }],
                                        })(
                                            <Input autoFocus placeholder={t('code_sku')} />,
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="col-sm-12 col-12 col-md-12 col-lg-6">
                                    <Form.Item label={t('tarifs')}>
                                        {getFieldDecorator('tarifs', {
                                            rules: [{ required: true, message: t('please_input') }],
                                        })(
                                            <Input autoFocus placeholder={t('tarifs')} />,
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="col-sm-6 col-md-7 col-12 p-0">
                                    <div className="row mx-0 flex-align-center">
                                        <h4 className="mb-0 font-weight-bold text-uppercase mr-4"> {t('profile_tarifaire_groupes')}</h4>
                                        <Button
                                            onClick={() => this.visibleTarifsCreateDrawer(true)}
                                            type="primary"
                                            className="plus-btn text-uppercase main-btn-tag flex-align-center text-white font-weight-bold pl-2 pr-3">
                                            <img src={Images.plus_icon_white} /> {t('create_profile_tarifaire')}</Button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                    <div className="col-12 mt-5">
                        <div class="row added-cart-item mx-0 coupon-row p-0" style={{ border: '1px solid #e0e0e0', backgroundColor: '#FBF7FD' }}>
                            <div class="col-sm-3 col-12 added-cart-img">
                                <img class="img-fluid" src={""} alt="item" />
                            </div>
                            <div className='col-12 col-sm-9 py-3'>
                                <div className="row">
                                    <div style={{ borderRight: '1px solid #DCC4E5' }} class="col-sm-6 col-12 added-cart-price px-3">
                                        <h5>Nom <span>BC.FUR-MR</span></h5>
                                        <ul class="added-pricing justify-content-start list-inline">
                                            <li className='list-inline-item'>
                                                <small style={{ color: '#646464' }}>Type de pièce</small>
                                            </li>
                                            <li className='list-inline-item'>
                                                <span className='d-inline-block' style={{ width: '27px', height: '11px', backgroundColor: '#BBAC6E' }}></span>
                                            </li>
                                            <li className='list-inline-item'>
                                                <small style={{ color: '#646464' }}>Color</small>
                                            </li>
                                        </ul>
                                        <div className="price-prix-bottom w-100">
                                            <h6>Prix:</h6>
                                            <h6>125,95</h6>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-12 added-cart-list px-3">
                                        <ul class="list-inline">
                                            <li className='list-inline-item'>Prix ​​unique:</li>
                                            <li className='list-inline-item'>$0</li>
                                        </ul>
                                        <ul class="list-inline">
                                            <li className='list-inline-item'>Prix de groupe:</li>
                                            <li className='list-inline-item'>$0</li>
                                        </ul>
                                        <ul class="list-inline">
                                            <li className='list-inline-item'>Quantité pour recevoir le prix de groupe:</li>
                                            <li className='list-inline-item'>24</li>
                                        </ul>
                                        <ul class="list-inline">
                                            <li className='list-inline-item'>Prix supplémentaire unique:</li>
                                            <li className='list-inline-item'>$0</li>
                                        </ul>
                                        <ul class="list-inline">
                                            <li className='list-inline-item'>Prix de groupe supplémentaire:</li>
                                            <li className='list-inline-item'>$0</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="steps-action steps-action-custom bg-white flex-align-center justify-content-end px-5">
                    <div>
                        <Button type="primary"
                            // onClick={this.handleSubmit}
                            className="font-weight-bold text-center text-white text-uppercase">
                            {this.props.match.params.method === methods.edit ? t('update_profile_btn') : t('crete_profill')}
                        </Button>
                    </div>
                </div>
                {params.method === methods.edit ?
                    confirmGroup ? <ConfirmPopup
                        onOk={() => history.push(reverse(routes.dashboard.profiles.tarifaire.method, {
                            method: methods.view,
                            id: group.id
                        }))}
                        remove_left_btn={true}
                        width="47%"
                        image={Images.check_icon}
                        onCancel={() => this.confirmGroupVisible(false)}
                        okText={t('view_profile')}
                        cancelText={false}
                        title={t('confirm_profile_update')}
                        description={t('group_updated')}
                        small_description={t('group_updated_main')}
                    /> : ""
                    :
                    confirmGroup ? <ConfirmPopup
                        onOk={() => history.push(reverse(routes.dashboard.profiles.tarifaire.method, {
                            method: methods.view,
                            id: group.id
                        }))}
                        width="47%"
                        image={Images.check_icon}
                        onCancel={() => this.props.history.go(-1)}
                        okText={t('view_profile')}
                        cancelText={"Ok"}
                        title={t('profile_create_confirm')}
                        description={t('created_group_new')}
                        small_description={t('created_group_profile_main')}
                    /> : ""
                }
                {this.state.visibleTarifsDrawer &&
                    <CreateTarifs visible={this.state.visibleTarifsDrawer} onClose={() => this.visibleTarifsCreateDrawer(false)} />
                }
            </React.Fragment>
        );
    }
}


export const TarifsGroupProfileForm = Form.create({
    name: "group_tarifaire",
    mapPropsToFields(props) {
        if (props.group) {
            return {
                title: Form.createFormField({
                    value: props.group.title
                }),
            }
        }

    }
})(withTranslation('common')(withRouter(TarifsGroupProfileFormComponent)));

