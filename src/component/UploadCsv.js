import React, { memo } from "react";

const UploadCsv = (props) => {
    const buttonClick = () => {
        props.loader(true);
        document.getElementById("reactCsv").click();
        document.body.onfocus = props.onChange;
    };

    const clickInput = (e) => {
        e.target.value = null;
    };

    return (
        <div>
            <button className="btn btn-primary" onClick={buttonClick}>
                {props.buttonLabel}</button>
            <input type='file' className='hideElement' accept='.csv'
                id='reactCsv' name="readCsv" onChange={props.onChange} onClick={clickInput}></input>
        </div>
    );
};
export default memo(UploadCsv);