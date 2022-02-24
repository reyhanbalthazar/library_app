import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { verifyAction } from '../redux/actions';

const VerificationPage = (props) => {

    const [redirect, setRedirect] = useState(false);
    const dispatch = useDispatch()
    const verify = async () => {
        try {
            await dispatch(verifyAction())
            setRedirect(true)
        } catch (error) {
            console.log(error)
        }
    }

    if (redirect) {
        return <Navigate to="/" />
    }

    return (
        <div>
            <div style={{marginTop:"200px", textAlign:"center"}}>
                <Button type='button' onClick={verify}>Verifikasi Akun</Button>
            </div>
        </div>
    )
}   

export default VerificationPage;