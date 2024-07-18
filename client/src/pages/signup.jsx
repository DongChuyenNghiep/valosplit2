import React, { useState } from 'react';
import '../css/signup.css';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  document.title = "Đăng kí";
  
  const [formData, setFormData] = useState({});
  const [retypePassword, setRetypePassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Error, setError1] = useState('');
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{7,}$/;
    return passwordRegex.test(password);
  };
  const validateEmail = (email) => {
    return email.includes('@');
  };
  const handleRetypePasswordChange = (e) => {
    setRetypePassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== retypePassword) {
      setError1('Mật khẩu không khớp');
      return;
    }
    if (!validateEmail(formData.email)) {
      setError1('Email không hợp lệ. Vui lòng nhập lại');
      return;
    }
    if (!validatePassword(formData.password)) {
      setError1('Mật khẩu không đúng với yêu cầu');
      return;
    }
    setError1('')
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

      navigate('/valorant');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <div className='container1' style={{ marginTop: "110px",justifyContent:"flex-start",marginBottom:"40px" }}>
        <div className='sign'>
          <h1 style={{ fontWeight: "700" }} className='text-3xl text-center font-semibold'>Đăng kí</h1>
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
              autoComplete="email"
            />
            <input
              type='password'
              placeholder='Mật khẩu'
              id='password'
              className='password'
              onChange={handleChange}
              autoComplete="new-password"
            />
            <p style={{margin:"10px 0 0 0"}}>Lưu ý: Mật khẩu cần có ít nhất 7 kí tự, bao gồm cả chữ in hoa và số</p>
            <input
              type='password'
              placeholder='Nhập lại Mật khẩu'
              id='retypePassword'
              className='password'
              onChange={handleRetypePasswordChange}
              autoComplete="new-password"
            />
            <button disabled={loading} className="signup-confirm">
              {loading ? 'Loading...' : 'Sign Up'}
            </button>
          </form>
          <div className='haveaccount'>
            <p>Đã có tài khoản?</p>
            <Link to='/valorant/signin'><span style={{ color: 'orange',marginBottom:"0" }}>Đăng nhập</span></Link>
          </div>
          {Error && <p style={{ color: '#FF7F7F',marginBottom:"0" }}>{Error}</p>}
          {error && <p style={{ color: '#FF7F7F' ,marginBottom:"0"}}>Something went wrong!</p>}
        </div>
      </div>
    </>
  );
}
