import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || '';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  async function submit(event) {
    event.preventDefault();
    setStatus({ state: 'loading', message: 'Sending your message…' });
    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Could not send your message.');
      setStatus({ state: 'success', message: data.message || 'Message received. Thank you!' });
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ state: 'error', message: error.message || 'Unable to reach the server. Check that the backend is running.' });
    }
  }

  return <form className="contact-form card" onSubmit={submit}>
    <div className="form-heading"><span>MESSAGE FORM</span><small>All fields required</small></div>
    <label>Name<input name="name" value={form.name} onChange={update} required minLength="2" maxLength="80" placeholder="Your name" /></label>
    <label>Email<input name="email" type="email" value={form.email} onChange={update} required maxLength="254" placeholder="you@example.com" /></label>
    <label>Message<textarea name="message" value={form.message} onChange={update} required minLength="10" maxLength="3000" rows="4" placeholder="Tell me a little about your message…" /></label>
    <button className="button button-dark submit-button" type="submit" disabled={status.state === 'loading'}><Send size={15}/>{status.state === 'loading' ? 'Sending…' : 'Send message'}</button>
    {status.message && <p className={`form-status ${status.state}`} role="status">{status.state === 'success' ? <CheckCircle2 size={16}/> : status.state === 'error' ? <AlertCircle size={16}/> : null}{status.message}</p>}
    <p className="privacy-note">Do not include passwords or sensitive personal information.</p>
  </form>;
}
