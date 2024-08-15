import React, { useEffect, useState } from 'react'
import {Wizard, useWizard} from 'react-use-wizard'

export default function ReactWizard() {

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [address, setAddress] = useState('');

  return (
      <Wizard>
        <Step1 setFname={setFname} setLname={setLname}/>
        <Step2 fname={fname} lname={lname} setAddress={setAddress}/>
        <Step3 fname={fname} lname={lname} address={address}/>
      </Wizard>
  )
}

const Step1 = ({setFname, setLname}) => {
  const {nextStep} = useWizard();
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');

  useEffect(() => {
    if(window.localStorage.getItem('fname')) {
      setFirst(window.localStorage.getItem('fname'));
    }
    if(window.localStorage.getItem('lname')) {
      setLast(window.localStorage.getItem('lname'));
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('fname', first);
  }, [first])

  useEffect(() => {
    window.localStorage.setItem('lname', last);
  }, [last])

  return (
    <>
    <input type='text' value={first} onChange={(e)=>{setFirst(e.target.value)}}></input>
    <input type='text' value={last} onChange={(e)=>{setLast(e.target.value)}}></input>
    <button onClick={()=>{setFname(first); setLname(last); nextStep();}}>Next</button>
    </>
  )
}

const Step2 = ({fname, lname, setAddress}) => {
  const {nextStep} = useWizard();

  const [txt, setTxt] = useState('');

  useEffect(() => {
    if(window.localStorage.getItem('address')) {
      setTxt(window.localStorage.getItem('address'));
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('address', txt);
  }, [txt])

  return (
    <>
    <p>Hey {fname} {lname} !</p>
    <input type='text' value={txt} onChange={(e)=>{setTxt(e.target.value)}}></input>
    <button onClick={()=>{setAddress(txt); nextStep();}}>Finish</button>
    </>
  )
}

const Step3 = ({fname, lname, address}) => {
  return (
    <>
    <p>Your first name: {fname}</p>
    <p>Your last name: {lname}</p>
    <p>Your address: {address}</p>
    </>
  )
}
