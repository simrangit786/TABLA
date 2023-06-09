import React, {Component} from 'react';
import {Button, Checkbox, Col, Form, message, Modal, Row} from "antd";
import {withTranslation} from "react-i18next";
import {ComponentPDFGetOne, EtiquetePDFGetOne, PDFGetOne} from "../../../controller/API/itemApi";
import {Role} from "../../../utils";


class Imprimer extends Component {
    state = {
        checkedValues: [],
        loading: false,
    };

    onChange = (checkedValues) => {
        this.setState({checkedValues})
    };

    handleSubmit = async () => {
        await this.setState({loading: true});
        await Promise.all(this.state.checkedValues.map(async o => {
            if (o === 'a') {
                await PDFGetOne(this.props.data.id, {barcode: true, product_sheet: true})
                    .then(response => {
                        window.open((response.url));
                    })
            } else if (o === 'b') {
                await PDFGetOne(this.props.data.id, {product_sheet: true})
                    .then(response => {
                        window.open((response.url));
                    })
            } else if (o.includes('_')) {
                await ComponentPDFGetOne(parseInt(o.split('_')[1]))
                    .then(response => {
                        window.open((response.url));
                    })
            } else if (o === 'd') {
                await PDFGetOne(this.props.data.id, {barcode: true})
                    .then(response => {
                        window.open((response.url));
                    })
            } else if (o === 'e') {
                await EtiquetePDFGetOne(this.props.data.id)
                    .then(response => {
                        window.open((response.url));
                    })
            }
        })).catch(() => {
            message.error("Something went wrong, Please try after a while.");
            this.setState({loading: false}, () => this.props.onClose());
        });
        this.setState({loading: false}, () => this.props.onClose());
    };

    render() {
        const {t, data} = this.props;
        return (
            <Modal
                title={t('print')}
                visible={this.props.visible}
                onCancel={this.props.onClose}
                width="25%"
                destroyOnClose={true}
                // okText={t('print')}
                // cancelText={t('cancel')}
                className="confirm-modal-main imp-modal-div"
                centered
                footer={[
                    <Button key={"cancel"} onClick={this.props.onClose}>{t('cancel')}</Button>,
                    <Button key={"submit"} loading={this.state.loading}
                            onClick={this.handleSubmit}>{t('print')}</Button>
                ]}
            >
                <div className="row mx-0 p-4">
                    <Form onSubmit={this.handleSubmit} className="main-form w-100">
                        <div className="col-12">
                            <Checkbox.Group style={{width: '100%'}} onChange={this.onChange}>
                                <Row>
                                    <Role allow={["admin"]}>
                                        <Col span={24}>
                                            <Checkbox value="a">Fiche produit et code-barre</Checkbox>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value="b">Fiche produit</Checkbox>
                                        </Col>
                                        {data && data.components.length > 0 ? data.components.map((o, index) =>
                                            <Col key={`checkbox_${index}`} span={24}>
                                                <Checkbox value={`component_${o.id}`}>Code-barre {o.name}</Checkbox>
                                            </Col>
                                        ) : <Col span={24}>
                                            <Checkbox value="d">Code-barre set</Checkbox>
                                        </Col>}
                                    </Role>
                                    <Role allow={["admin", "distributor"]}>
                                        <Col span={24}>
                                            <Checkbox value="e">Etiquette</Checkbox>
                                        </Col>
                                    </Role>
                                </Row>
                            </Checkbox.Group>
                        </div>
                    </Form>
                </div>
            </Modal>
        );
    }
}

export default (withTranslation('common')(Imprimer));
