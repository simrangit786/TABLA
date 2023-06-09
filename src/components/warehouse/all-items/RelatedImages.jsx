import React, {Component} from 'react';
import {Button, Icon, message, Modal, Tooltip, Upload} from "antd";
import {Image as Images} from "../../Images"
import {withTranslation} from "react-i18next";
import {variantImageAdd, variantImageOrderUpdate, variantImageRemove} from "../../../controller/API/itemApi";
import PreviewItem from "../../modal/ware-house/PreviewItem";
import {methods} from "../../../controller/Global";
import ConfirmPopup from "../../modal/ConfirmPopup";
import {history} from "../../../controller/history";
import {reverse} from "named-urls";
import {routes} from "../../../controller/routes";

class RelatedImages extends Component {

    state = {
        previewVisible: false,
        previewImage: '',
        articleUpdate: false,
        fileList: this.props.item.images,
        uploading: false,
        showPreview: false
    };

    handleCancel = () => this.setState({previewVisible: false});

    articleUpdateShow = (visible) => {
        this.setState({
            articleUpdate: visible,
        });
        if (!visible)
            this.props.close();
    };


    showPreview = (visible) => {
        this.setState({
            showPreview: visible,
        });
    };


    handlePreviewImage = file_url => {
        this.setState({
            previewImage: file_url,
            previewVisible: true
        })
    };

    handleChange = async ({file}) => {
        let form = new FormData();
        form.append("name", file.name);
        form.append("image", file);
        form.append("variant", this.props.item.id);
        form.append("order", this.state.fileList.length + 1);
        variantImageAdd(form)
            .then(response => {
                let {fileList} = this.state;
                fileList.push(response.data);
                this.setState({...fileList})
            })
    };

    handleDelete = (id, index) => {
        variantImageRemove(id)
            .then(() => {
                let {fileList} = this.state;
                fileList.splice(index, 1);
                this.orderUpdate(fileList);
            })
    };

    orderUpdate = (fileList) => {
        let data = {};
        data['variant'] = this.props.item.id;
        data['images'] = fileList.map((data, index) => {
            return {"id": data.id, "order": index}
        });
        variantImageOrderUpdate(data)
            .then(() => {
                this.setState({fileList})
            });

    };


    onChangeOrder = (direction, index) => {
        const {fileList} = this.state;
        let data = fileList;
        if (direction === 'right') {
            let b = data[index];
            data[index] = data[index + 1];
            data[index + 1] = b;
        }
        if (direction === 'left') {
            let b = data[index];
            data[index] = data[index - 1];
            data[index - 1] = b;
        }
        this.orderUpdate(data);
    };
    handleDefault = (index) => {
        const {fileList} = this.state;
        let data = fileList;
        let b = data[index];
        data[index] = data[2];
        data[2] = b;
        this.orderUpdate(data);
        message.success('Default Image have been set');

    };
    handleHover = (index) => {
        const {fileList} = this.state;
        let data = fileList;
        let b = data[index];
        data[index] = data[0];
        data[0] = b;
        this.orderUpdate(data);
        message.success('Default Image have been set');

    };


    render() {
        const {previewVisible, previewImage, fileList, articleUpdate, showPreview} = this.state;
        const {t, method, item} = this.props;
        const uploadButton = (
            <div>
                <img src={Images.uploda_icon_img} alt="upload img" className="img-fluid"/>
                <p className="ant-upload-text">{t('drag_drop')}</p>
                <Button type="primary">
                    <Icon type="plus"/>
                    {t('import_file')}
                </Button>
            </div>
        );
        return (
            <React.Fragment>
                <div className="row mx-0 upload-file-folder-div h-100">
                    <div className="col-sm-12 col-md-12 col-lg-6 col-12">
                        <div className="images-headtext">{t('images_optional')}</div>
                        <Upload
                            listType="picture-card"
                            multiple
                            showUploadList={false}
                            onPreview={() => false}
                            beforeUpload={() => false}
                            onChange={this.handleChange}
                        >
                            {uploadButton}
                        </Upload>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6 col-12">
                        <div className="row uploaded-row">
                            {fileList.map((imageData, index) =>
                                <div className="col-sm-3 col-4 image-list" key={index}>
                                    <div className="uploaded-thumbnail">
                                        <img src={imageData.image} alt={imageData.preview} className="img-fluid"/>
                                        <div className="hover-upload-img">
                                            <div className="buttons-div">
                                                <div>
                                                    <Button onClick={() => this.handlePreviewImage(imageData.image)}
                                                            icon="eye"/>
                                                    <Button onClick={() => this.handleDelete(imageData.id, index)}
                                                            icon="delete"/>
                                                    {index !== 2 &&
                                                    <Tooltip title="Set default Image">
                                                        <Button onClick={() => this.handleDefault(index)}
                                                                icon="check-circle"/>
                                                    </Tooltip>}
                                                </div>
                                                <div>
                                                    {index !== 0 &&
                                                    <Tooltip title="Set Hover Image">
                                                        <Button onClick={() => this.handleHover(index)}>H</Button>
                                                    </Tooltip>}
                                                    {index !== 0 &&
                                                    <Tooltip title="Change order to left">
                                                        <Button icon="left"
                                                                onClick={() => this.onChangeOrder('left', index)}/>
                                                    </Tooltip>}
                                                    {!(index === fileList.length - 1) &&
                                                    <Tooltip title="Change order to right">
                                                        <Button onClick={() => this.onChangeOrder('right', index)}
                                                                icon="right"/>
                                                    </Tooltip>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {!index && <Tooltip title={"This image is the hover image on the website."}>
                                        <span className="hover-label">Hover Image <Icon type="info-circle"
                                                                                        theme="twoTone"
                                                                                        twoToneColor="#52c41a"/> </span></Tooltip>}
                                </div>
                            )}
                        </div>
                    </div>
                    {previewVisible && <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{width: '100%'}} src={previewImage}/>
                    </Modal>}
                </div>
                <div
                    className="drawer-footer-fixed steps-action steps-action-custom bg-white flex-align-center justify-content-end px-3 py-2">
                    <div>
                        <Button style={{marginRight: 15}} onClick={this.props.prev}>
                            {t('return')}
                        </Button>
                        <Button style={{marginRight: 15}} onClick={() => this.showPreview(true)}>
                            {t('previewArticle')}
                        </Button>
                        <Button type="primary" onClick={() => this.articleUpdateShow(true)}
                                className="font-weight-bold text-center text-white text-uppercase">
                            {method === methods.edit ? t('update_item') : t('creteitem')}
                        </Button>
                    </div>
                </div>
                {method === methods.edit ?
                    articleUpdate ? <ConfirmPopup
                        remove_left_btn={true}
                        onOk={() => {
                            history.push(reverse(routes.dashboard.warehouse.item, {method: methods.view, id: item.id}));
                            this.articleUpdateShow(false)
                        }}
                        width="50%"
                        image={Images.check_icon}
                        onCancel={() => this.articleUpdateShow(false)}
                        okText={'VOIR ARTICLE'}
                        cancelText={"OK"}
                        title={"CONFIRMATION DE MISE À JOUR D’ARTICLE"}
                        description={"L’article a été mis à jour !"}
                        small_description={"L’article a été mis à jour. Pour voir les détails, mettre à jour ou modifier, sélectionner ‘Voir article’."}
                    /> : ""
                    :
                    articleUpdate ? <ConfirmPopup
                        onOk={() => {
                            history.push(reverse(routes.dashboard.warehouse.item, {method: methods.view, id: item.id}));
                            this.articleUpdateShow(false)
                        }}
                        width="50%"
                        image={Images.check_icon}
                        onCancel={() => this.articleUpdateShow(false)}
                        okText={'VOIR ARTICLE'}
                        cancelText={"OK"}
                        title={"CONFIRMATION DE CRÉATION D’ARTICLE"}
                        description={"Article créé ! "}
                        small_description={"Article a été créé. Pour voir les détails, mettre à jour ou modifier, sélectionner ‘Voir article’."}
                    /> : ""
                }
                {showPreview && <PreviewItem visible={showPreview} images={fileList} itemId={this.props.item.id}
                                             onClose={() => this.showPreview(false)}/>}
            </React.Fragment>
        );
    }
}

export default (withTranslation('common')(RelatedImages));