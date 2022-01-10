import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalCustom = (props) => {

    const onClickConfirm = (isUserConfirmed) => {
        if (isUserConfirmed) {
            props.onClickConfirm();
        }
        else {
            props.onClickNoButton(false);
        }
    };

    const headerString = props.modalHeader;
    const subStringDelete = "Delete";
    const subStringError = "Error";
    const subStringReset = "Reset";
    const subStringSuccess = 'Success';
    var deleteBlock = "";
    var buttnClr = "";

    //deleteBlock-red Theme
    //warningBlock-Amber theme
    if (headerString.includes(subStringDelete)) {
        deleteBlock = "deleteBlock";
    }
    if (headerString.includes(subStringError)) {
        deleteBlock = "deleteBlock";
    }
    if (headerString.includes(subStringReset)) {
        deleteBlock = "deleteBlock";
    }
    if (headerString.includes(subStringReset)) {
        deleteBlock = "successBtnColor";
    }
    else {
        buttnClr = props.modalCloseBtn;
    }

    return (
        <Modal
            animation={false}
            show={props.show}
            size={props.size}
            onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={deleteBlock}
            backdrop="static"
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <i className='fa fa-exclamation-circle'></i>{props.modalHeader}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>{props.modalBody}</p>
            </Modal.Body>

            <Modal.Footer>
                {props?.onClickNoButton ?
                    (<Button onClick={() => onClickConfirm(false)} className={`right ${buttnClr}`}>
                        <i className='fa fa-times'></i>{props?.modalCloseBtn}
                    </Button>) : null}

                {props?.modalConfirmBtn ?
                    (<Button onClick={() => onClickConfirm(true)} className={`left ${props?.modalConfirmBtn}`}>
                        <i className='fa fa-check'></i>{props?.modalConfirmBtn}
                    </Button>) : null}
            </Modal.Footer>
        </Modal>
    );


};

export default ModalCustom;