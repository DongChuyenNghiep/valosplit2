import React,{ useState } from 'react';
import '../css/signup.css';
import { Link,useNavigate} from 'react-router-dom'
import { signInStart,signInFailure,signInSuccess } from '../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function SignIn() {
    const [formData, setFormData] = useState({});
    const {loading,error} = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        dispatch(signInStart());
        const res = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        
        if (data.success === false) {
          dispatch(signInFailure(data));
          return;
        }
        dispatch(signInSuccess(data));
        navigate('/')
      } catch (error) {
        dispatch(signInFailure(error))
      }
    };
    return (
        <>
            <h1 style={{ marginTop: '200px' }} className='text-3xl text-center font-semibold'>Sign In</h1>
            <form onSubmit={handleSubmit} className='signup'>
                <input
                    type='text'
                    placeholder='Email'
                    id='email' 
                    className='email'
                    onChange={handleChange}
                />
                <input
                    type='password'
                    placeholder='Password'
                    id='password'
                    className='password'
                    onChange={handleChange}
                />
                <button disabled={loading} className="signup-confirm">{loading ? 'Loading...' : 'Sign In'}</button>
            </form>
            <div className='haveaccount'>
                <p>Dont have an account?</p>
                <Link to='/signup'><span>Sign up</span></Link>

            </div>
            <p style={{color:'red'}}>{error ? error.message|| 'Something went wrong!' : ''}</p>
        </>
    )
}