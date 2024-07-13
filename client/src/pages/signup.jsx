import React,{ useState } from 'react';
import '../css/signup.css';
import { Link,useNavigate} from 'react-router-dom'
export default function SignUp() {
  document.title = "Đăng kí"
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        setError(false);
        const res = await fetch('https://valosplit2-backend.vercel.app/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data);
        setLoading(false);
        if (data.success === false) {
          setError(true);
          return;
        }
        navigate('/valorant')
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    return (
        <>
        <div className='sign'>
            <h1 style={{ marginTop: '100px' }} className='text-3xl text-center font-semibold'>Sign Up</h1>
            <form onSubmit={handleSubmit} className='signup'>
                <input
                    type='text'
                    placeholder='RiotID'
                    id='riotID'
                    className='username'
                    onChange={handleChange}
                />
                <input
                    type='text'
                    placeholder='Username'
                    id='username'
                    className='username'
                    onChange={handleChange}
                />
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
                <button disabled={loading} className="signup-confirm">{loading ? 'Loading...' : 'Sign Up'}</button>

            </form>
            <div className='haveaccount'>
                <p>Đã có tài khoản?</p>
                <Link to='/valorant/signin'><span style={{color:'orange'}}>Đăng nhập</span></Link>

            </div>
            <p style={{color:'red'}}>{error && 'Something went wrong!'}</p>
            </div>
        </>
    )
}