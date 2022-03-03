import React, { useState, useRef } from 'react';
import SpinnerCustom from './SpinnerCustom';
import * as Yup from 'yup';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import RadioButtonList from './RadioButtonList';
import CheckBoxList from './CheckBoxList';
import AutoCompleteDropDown from './autoCompleteDropDown';
import forge from 'node-forge';
import { CSVLink } from 'react-csv';
import UploadCsv from './UploadCsv';

const RegistratioForm = (props) => {
    const [nationalitySelected, setNationalitySelected] = useState();
    const [isLoader, setLoader] = useState(false);
    const[parcelArr,setParcelArr] = useState([]);
    const csvLinkE1 = useRef();
    const sampleData = [
        {
            Parcel: 'ASDG123456'
        },
        {
            Parcel: 'ASDG123457'
        },
        {
            Parcel: 'ASDG123458'
        }
    ];
    const initialValues = {
        firstName: '',
        lastName: '',
        gender: '',
        qualification: '',
        address: [],
        nationality: ''
    };

    const genderList = [
        {
            value: 'Male',
            label: 'Male'
        },
        {
            value: 'Female',
            label: 'Female'
        }
    ];

    const qualificationList = [
        {
            value: '10th',
            label: '10th'
        },
        {
            value: '12th',
            label: '12th'
        },
        {
            value: 'Graduation',
            label: 'Graduation'
        },
        {
            value: 'Post Graduation',
            label: 'Post Graduation'
        }
    ];

    const nationalityList = [
        {
            value: 'Indian',
            label: 'Indian'
        },
        {
            value: 'Other',
            label: 'Other'
        }
    ];

    const initialValidationSchema = Yup.object({
        firstName: Yup.string().required('First name is Required'),
        lastName: Yup.string().required('Last name is Required'),
        gender: Yup.string().required('Gender is Required'),
        qualification: Yup.string().required('Qualification is Required'),
        nationality: Yup.string().required('Nationality is Required')
    });

    const genderSelectHandler = (childData) => {
        console.log('gender selected', childData);
    };

    const qualificationHandler = (childData) => {
        console.log('Qualification selected', childData);
    };

    const nationalityHandler = (childData) => {
        setNationalitySelected(childData);
    };

    const showEncrypt = () => {
        var md = forge.md.sha512.create();
        md.update('Sugandha');
        var pass = md.digest().toHex();
        console.log(pass);
    };

    const bulkUpload = (event) => {
        if (event.target.files === undefined) {
            setLoader(false);
            document.body.onfocus = null;
            return;
        }
        setLoader(true);
        var reader = new FileReader();
        var data = [];
        reader.onload = function () {
            data = reader.result.split('\n');
            var header = data[0].replace(/\s+/g, "");
            var index = -1;
            if (header === 'Parcel' || header === '"Parcel"') {
                index = 0;
            }
            if (data.length <= 1 || index === -1) {
                setLoader(false);
                console.log('Error is there while uploading');
            }
            else {
                var paarcelData = [];
                for (let i = 1; i < data.length - 1; i++) {
                    paarcelData.push(data[i].split(',')[index]);
                }
                for (let i = 0; i < paarcelData.length; i++) {
                    paarcelData[i] = paarcelData[i].replace(/\s/g, '').trim();
                }
                console.log('parcel data',parcelArr);
                setParcelArr(paarcelData);
            }
        };
        if (event.target.files[0] !== undefined) {
            setLoader(false);
            document.body.focus = null;
            return;
        }
        reader.readAsText(event.target.files[0]);
    };

    const loaderHandler = (childData) => {
        if (childData !== undefined && childData !== null) {
            setLoader(childData);
        }
    };

    const downloadCsv = () => {
        console.log(`user clicked sample download button`);
        csvLinkE1.current.link.click();
    };

    const onSubmit = () => {
        console.log('Inside Submit');
    };



    return (
        <div className='pageContainer container_wrapper'>
            <SpinnerCustom isLoader={isLoader}></SpinnerCustom>

            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Formik
                    initialValues={initialValues}
                    validationSchema={initialValidationSchema}
                    onSubmit={onSubmit}
                    enableReinitialize>
                    {({ setFieldValue }) => (
                        <Form>
                            <div className='rowDiv'>
                                <div className='form-group'>
                                    <label htmlFor='firstName' className='formLabel form-Label'>First Name</label>
                                    <Field type='text' name='firstName'></Field>
                                </div>
                                <div className='row errorContainer'>
                                    <div className='errorSpaceDiv'>
                                    </div>
                                    <div className='errorDiv'>
                                        <small className='red left boldFont'>
                                            <ErrorMessage name='firstName' />
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <div className='rowDiv'>
                                <div className='form-group'>
                                    <label htmlFor='lastName' className='formLabel form-Label'>Last Name</label>
                                    <Field type='text' name='lastName'></Field>
                                </div>
                                <div className='row errorContainer'>
                                    <div className='errorSpaceDiv'>
                                    </div>
                                    <div className='errorDiv'>
                                        <small className='red left boldFont'>
                                            <ErrorMessage name='lastName' />
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <div className='rowDiv'>
                                <div className='form-group'>
                                    <label htmlFor='gender' className='formLabel form-Label'>Gender</label>
                                    <RadioButtonList
                                        radioButtonList={genderList}
                                        parentCallback={genderSelectHandler}
                                        setFieldValue={setFieldValue}
                                        fieldValueName='gender'
                                        disabled={props.viewOnly ? true : false}
                                        defaultValue={props.data ? props.data.gender : ''}
                                    />
                                </div>
                                <div className='row errorContainer'>
                                    <div className='errorSpaceDiv'>
                                    </div>
                                    <div className='errorDiv'>
                                        <small className='red left boldFont'>
                                            <ErrorMessage name='gender' />
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <div className='rowDiv'>
                                <div className='form-group row'>
                                    <label htmlFor='qualification' className='formLabel form-Label'>Qualification</label>
                                    <CheckBoxList
                                        checkBoxListValue={qualificationList}
                                        parentCallback={qualificationHandler}
                                        checkBoxListHeader='Select'
                                        setFieldValue={setFieldValue}
                                        fieldValueName='qualification'
                                        className='left'
                                        defaultChecked={[]}
                                        disabled={props?.viewOnly}
                                        height='20rem'
                                    />
                                </div>
                                <div className='row errorContainer'>
                                    <div className='errorSpaceDiv'>
                                    </div>
                                    <div className='errorDiv'>
                                        <small className='red left boldFont'>
                                            <ErrorMessage name='qualification' />
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <div className='rowDiv'>
                                <div className='form-group row'>
                                    <label htmlFor='address' className='formLabel form-Label'>Address</label>

                                    <FieldArray name='address'>
                                        {
                                            (fieldArrayProps) => {
                                                const { push, remove, form } = fieldArrayProps;
                                                const { values } = form;
                                                const { address } = values;
                                                return <div className="addressLeg">
                                                    {
                                                        address.length !== 0 &&
                                                        address.map((closeDate, index) => (
                                                            <div key={index} className='formWrapper_zone'>
                                                                {
                                                                    index > 0 &&
                                                                    <label className='formLabel form-label'>
                                                                    </label>
                                                                }
                                                                <Field type='text' name={`address[${index}]`}></Field>

                                                                <button type='button' className='left btn btn-danger'
                                                                    onClick={() => {
                                                                        remove(index, '');
                                                                    }}>
                                                                    <i className="fa fa-minus"></i>
                                                                </button>
                                                            </div>
                                                        ))
                                                    }

                                                    <button className='left btn btn-primary' type='button'
                                                        onClick={() => {
                                                            push('');
                                                        }}>
                                                        <i className='fa fa-plus'></i>
                                                    </button>
                                                </div>;
                                            }
                                        }
                                    </FieldArray>
                                </div>
                            </div>

                            <div className='rowDiv'>
                                <div className='form-group'>
                                    <label htmlFor='nationality' className='formLabel form-Label'>Nationality</label>
                                    <AutoCompleteDropDown
                                        dropDownValue={nationalityList}
                                        parentCallBackOnChangehandler={e => nationalityHandler(e)}
                                        setFieldValue={setFieldValue}
                                        disabled={props?.viewOnly}
                                        defaultValue={nationalitySelected?.value}
                                        defaultLabel={nationalitySelected?.label}
                                        fieldName='nationality'
                                        label='Please Select Nationality'
                                        showLabelAndValue={true}>
                                    </AutoCompleteDropDown>

                                    <Field as="select"
                                        name="nationality"
                                        onBlur={nationalityHandler}
                                        disabled={props?.viewOnly}>
                                        {nationalityList.map((option, index) => (
                                            <option key={index} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                                <div className='row errorContainer'>
                                    <div className='errorSpaceDiv'>
                                    </div>
                                    <div className='errorDiv'>
                                        <small className='red left boldFont'>
                                            <ErrorMessage name='nationality' />
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <div className='rowDiv'>
                                <UploadCsv onChange={bulkUpload} loader={loaderHandler} buttonLabel='Bulk Upload'></UploadCsv>
                                <a className='sampleDownload' onClick={downloadCsv}>Click here to down sample file</a>
                                <CSVLink
                                    data={sampleData}
                                    fileName='smaple_file.csv'
                                    className='hidden'
                                    ref={csvLinkE1}
                                    target='_blank'
                                >

                                </CSVLink>
                            </div>

                            <div>

                                <button className="btn btn-primary export" type='button'
                                    onClick={showEncrypt}>Show Encrypted Value</button>

                                <button type='button' className='btn btn-primary'>
                                    <i className='fa fa-chevron-left'></i>
                                    Back
                                </button>

                                <button type='submit' className='btn btn-primary'>
                                    <i className='fa fa-edit'></i>
                                    Submit
                                </button>


                            </div>
                        </Form>

                    )}
                </Formik>
            </div>

        </div>
    );
};

export default RegistratioForm;