import React, {Component} from 'react';
import {Button, Input, Modal} from "antd";
import {Image as Images} from "../../../../../Images";

const {TextArea} = Input;

class AddComment extends Component {
    constructor(props) {
        super(props);
        this.textRef = React.createRef()
    }

    handleComment = () => {
        this.props.updateCreditComment(this.textRef.current.state.value)
        this.props.onClose()
    }

    render() {
        return (
            <React.Fragment>
                <Modal
                    visible={this.props.visible}
                    onCancel={this.props.onClose}
                    width="35%"
                    title={
                        <div className="custom-header-modal">
                            <h4>Ajouter un commentaire</h4>
                            <Button onClick={this.props.onClose}
                                    className="close-header-icon add-comment-btn w-auto flex-align-center-center px-3 position-absolute p-0 border-0">
                                <img src={Images.close_icon} alt="close icon" className="img-fluid"/>
                            </Button>
                        </div>
                    }
                    className="hide-close-btn"
                    footer={
                        <Button type="primary" onClick={this.handleComment}>
                            Ajouter Ce commentaire
                        </Button>
                    }>
                    <div className="row mx-0 py-4 px-4">
                        <div className="col-12">
                            <TextArea ref={this.textRef} rows={6}/>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}

export default AddComment;