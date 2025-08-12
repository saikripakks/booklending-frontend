import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('https://booklending.kripzart.in/api/token/', form).then(res => {
      localStorage.setItem('access', res.data.access);
      navigate('/');
    }).catch(err => alert('Login failed'));
  };

  return (
    <div className="max-w-md mx-auto p-4 border mt-10 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
<input type="text" className="w-full p-2 border rounded" placeholder="Username"
          onChange={e => setForm({ ...form, username: e.target.value })} />
        </div>
        <div>
<input type="password" className="w-full p-2 border rounded" placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })} />
        </div>
        <div>
<button type="submit" className="mt-2  btn btn-primary">Login</button>
        </div>
        
      </form>
    </div>
  );
}
