import React from 'react';

const SpinnerCustom = (props) => {
    return (
        <div className='conatiner_wrapper'>
            {props?.isLoader ? (
                <div className='spinner_Wrapper'>
                    <div id="spinner" animation="border" role="status" variant="info">
                        <div className="test_loader">
                            <div>te</div>
                            <div>te</div>
                            <div>te</div> 
                            <div>te</div>
                            </div>
                    </div>
                </div>
            ) : null}

        </div>
    );
};

export default SpinnerCustom;