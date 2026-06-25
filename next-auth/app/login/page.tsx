"use client"
import {loginAction} from "../actions/auth-action"
import { useActionState } from 'react';

export default function page() {
   
   const [formState,formAction]= useActionState(loginAction,{});
    return (
        <div id="form-wrapper">
            <form action={formAction} className='form-control'>
                <label htmlFor='email'>
                    Email
                </label>
                <input id="email" name="email" type="email" required />
                <label htmlFor='password'>
                    Password
                </label>
                <input id="password" name="password" type="password" required />
                {formState?.error && <p>{formState.error}</p>}
                <button >Submit</button>  
            </form>
        
        </div>
    )
}
