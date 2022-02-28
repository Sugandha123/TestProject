import React, { useState } from 'react';
import SpinnerCustom from './SpinnerCustom';
import * as Yup from 'yup';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import RadioButtonList from './RadioButtonList';
import CheckBoxList from './CheckBoxList';

const RegistratioForm = (props) => {
    const initialValues = {
        firstName: '',
        lastName: '',
        gender: '',
        qualification: '',
        address:[]
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

    const initialValidationSchema = Yup.object({
        firstName: Yup.string().required('First name is Required'),
        lastName: Yup.string().required('Last name is Required'),
        gender: Yup.string().required('Gender is Required'),
        qualification: Yup.string().required('Qualification is Required'),
    });

    const genderSelectHandler = (childData) => {
        console.log('gender selected', childData);
    };

    const qualificationHandler = (childData) => {
        console.log('Qualification selected', childData);
    };


    const onSubmit = () => {
        console.log('Inside Submit');
    };

    const [isLoader] = useState(false);

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
                                                    onClick={()=>{
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
                            <div>
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