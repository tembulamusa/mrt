import React, {useState, useContext, useEffect} from 'react';
import mpesa from '../../../assets/img/mpesa-3.png';
import makeRequest from "../../utils/fetch-request";
import { Formik,  Form} from 'formik';
import { Context } from '../../../context/store';
import {getBetslip} from '../../utils/betslip'


const Header = React.lazy(()=>import('../../header/header'));
const SideBar = React.lazy(()=>import('../../sidebar/awesome/Sidebar'));
const Right = React.lazy(()=>import('../../right/index'));
const Footer = React.lazy(()=>import('../../footer/footer'));

const Withdrawal = (props) => {
    //todo get the phone number from logged in user ....
    const [state, dispatch] = useContext(Context);
   
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState(null);

    const initialValues = {
        amount: '',
        msisdn: state?.user?.msisdn
    }

    const handleSubmit = values => {
        let endpoint = '/v1/withdraw';
        console.log("The endpoint is here");
        let user = state?.user;
        user.amount = values.amount;
        makeRequest({url: endpoint, method: 'POST', data: {"amount":values.amount, "msisdn":values.msisdn, "user":user}, use_jwt:true}).then(([status, response]) => {
            setSuccess(status === 200 || status === 201);
            setMessage(response);
        })

        console.log("Made a request");
    }

    const validate = values => {

        let errors = {}

        if (!values.msisdn || !values.msisdn.match(/(255|0|)?\d{9}/g) ) {
            errors.msisdn = 'Please enter a valid phone number'
        }

        if (!values.amount || values.amount < 100 || values.amount > 600000) {
            errors.amount = "Please enter amount between TZS 100 and Tsh 600, 000";
        }
        return errors
    }

    const FormTitle = () => {
       return (
            <div className='col-md-12 primary-bg p-4 text-center'>
                <h4 className="inline-blok">
                    WITHDRAW FUNDS (MOBILE MONEY)
                </h4>
            </div>
       )
    }
    useEffect(() => {
        let betslip = getBetslip();
        if (betslip) {
            dispatch({type: "SET", key: "betslip", payload: betslip});
        }
    }, [])


    const WithdrawFormFields = (props) => {
        const { values, errors, onFieldChanged } = props;
    
        return (
            <>
            <div className="form-group row d-flex justify-content-center">
                <div className="col-md-12">
                    <label>Phone Number</label>
                    <input
                        readOnly={true}
                        className="text-dark deposit-input form-control input-field"
                        id="msisdn"
                        name="msisdn"
                        type="text"
                        value ={values.msisdn}
                        placeholder='Enter Phone Number'
                    />
                    {errors.msisdn &&  <div className='text-danger'> {errors.msisdn} </div>  }
                </div>
            </div>
            <div className="form-group row d-flex justify-content-center mt-5">
                <div className="col-md-12">
                    <label>Amount to Withdraw</label>
                    <input
                        onChange={ev => onFieldChanged(ev) }
                        className="text-dark deposit-input form-control col-md-12 input-field"
                        id="amount"
                        name="amount"
                        type="text"
                        value ={values.amount}
                        placeholder='Enter Amount'
                    />
                    {errors.amount &&  <div className='text-danger'> {errors.amount} </div>  }
                </div>
            </div>
            <div className="form-group row d-flex justify-content-left mb-4">
                <div className="col-md-3">
                    <button
                        className='btn btn-lg btn-primary mt-5 col-md-12 deposit-withdraw-button'>
                        Withdraw
                    </button>
                </div>
            </div>
         </>
       )
    }


    const PaymentInstructions = (props) => {
         return (
             <>
                <label className='header text-info'>Withdrawal Instructions</label>
                <div className="container">
                    <div className="row"><div className="col"> 2. Weka kiwango kisichopungua 1000.</div></div>
                    <div className="row"><div className="col"> 3. Bonyeza "Withdraw".</div></div>
                    <div className="row"><div className="col"> 4. Check your phone for a Confirmation.</div></div>
                </div>
            </>
        );
    }
    const MyWithdrawalForm = (props) => {
        const {errors, values, setFieldValue } = props;

        const onFieldChanged = (ev)=>{
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
        }
       return (
            <Form className=" rounded border-0" >
                <div className="pt-0">
                    <div className="row">
                        <div className='col-md-7 text-center'>
                        </div>
                        <hr/>
                        <WithdrawFormFields  onFieldChanged ={ onFieldChanged} values ={values } errors={errors} />
                        <hr/>
                        <PaymentInstructions />
                    </div>
                </div>
            </Form>
        ); 
    }

    const WithdrawalForm = (props) => {
        return (
             <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
                validate={validate}
                render = {(props) => <MyWithdrawalForm {...props} /> } />
            );
    }

    const Alert = (props) => {
        let c = success ? 'success' : 'danger';
        return (<>{ message  && <div role="alert" className={`fade alert alert-${c} show`}>{message}</div> } </>) ;

    };

    return (
         <React.Fragment>
             <Header/>
             <div className="amt">
                 <div className="d-flex flex-row justify-content-between">
                     <SideBar loadCompetitions/>
                     <div className="gz home" style={{width: '100%'}}>
                         <div className="homepage">
                      <FormTitle />
                        <div className="col-md-12 mt-2  p-2">
                            <Alert />
                            <div className="modal-body pb-0" data-backdrop="static">
                                 <WithdrawalForm />
                            </div>
                        </div>
                    </div>
                </div>
                <Right/>
             </div>
           </div>
           <Footer/>
       </React.Fragment>
    )
}

export default Withdrawal;
