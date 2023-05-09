import React, {useCallback, useEffect, useState, useContext} from "react";

import makeRequest from "../utils/fetch-request";
import { getBetslip } from "../utils/betslip";
import {
    getFromLocalStorage,
    setLocalStorage
} from '../utils/local-storage';
import {Context} from '../../context/store';
import Index from '../../assets/img/payment_logos/index.png'
import Mpesa from '../../assets/img/payment_logos/mpesa-logo.png'
import Tigo from '../../assets/img/payment_logos/tigo_pesa.png'
import moment from 'moment';
import Moment from 'react-moment';


const Transactions = (props) => {
    const [state, dispatch] = useContext(Context);
    const [currentDate, setCurrentDate]  = useState();
    const [transactions, setTransactions] = useState();


    const fetchTransactions = () => {
        let endpoint = "/v1/mytransactions";
        let payload = {token:state?.user?.token}
        makeRequest({url: endpoint, method: 'POST', data: payload}).then(([status, response]) => {
            setTransactions(response);
        })
    }
    useEffect(() => {
        let c_date= moment();
        setCurrentDate(new Date());
        let betslip = getBetslip();
        if (betslip) {
            dispatch({type: "SET", key: "betslip", payload: betslip});
        }
        fetchTransactions();
    }, [state?.user]);


    return (
        <>
            <div className='col-md-12 biko-bg p-2 text-cente'>
                <h4 className="inline-blok cap-tex">MY TRANSACTIONS
               <span style={{float:"right", fontSize:"14px", fontWeight:"normal"}}>As at <Moment format="DD/MM/YYYY HH:mm">{currentDate}</Moment> </span></h4>
            </div>

            <div className="card">
                <div className="card-body">
                    <div className="small-box-content"><strong>Account balance <span style={{float:"right"}}>{state?.user?.balance}</span></strong></div>
                     <div className="container">
                        <div className="row">
                            <div className="col">DATE & TIME</div>
                            <div className="col">DESCRIPTION</div>
                            <div className="col">AMOUNT</div>
                            <div className="col">BALANCE</div>
                         </div>
                        <div className="row">
                            <div className="small-box-content">
                            { transactions &&
                                Object.entries(transactions).map(([key, tr]) => ( 
                                    <div className="row item-row" key={key}>
                                        <div className="col">{tr.created}</div>
                                        <div className="col">{tr.description}</div>
                                        <div className="col">{tr.amount}</div>
                                        <div className="col">{tr.balance}</div>
                                     </div>
                                                                                 
                                ))
                            }

                            </div>
                         </div>
                      </div>

                </div>

            </div>
        </>
    )
}

export default Transactions;
