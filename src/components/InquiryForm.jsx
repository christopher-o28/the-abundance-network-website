import { useState } from 'react'
import { submitForm } from '../lib/sheets'
import Button from './Button'

/**
 * fields: [{ name, label, type: 'text'|'email'|'textarea', required }]
 */
export default function InquiryForm({ formName, fields, submitLabel = 'Send' }) {
  const [values, setValues] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('')

  function update(name, value) {
    setValues((v) => ({ ...v, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    try {
      await submitForm(formName, values)
      setStatus('sent')
      setValues({})
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-lg border border-tape/30 bg-tape/5 px-6 py-8 text-center">
        <p className="font-display text-lg font-semibold">Got it — thanks!</p>
        <p className="mt-1 text-sm text-ink/60">We'll get back to you shortly.</p>
        <Button variant="outline" className="mt-4" onClick={() => setStatus('idle')}>
          Send another
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {fields.map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className="block text-sm font-medium text-ink/70 mb-1.5">
            {f.label}{f.required && <span className="text-signal"> *</span>}
          </label>
          {f.type === 'textarea' ? (
            <textarea
              id={f.name}
              required={f.required}
              rows={4}
              value={values[f.name] || ''}
              onChange={(e) => update(f.name, e.target.value)}
              className="w-full rounded-lg border border-line bg-paper px-4 py-3 text-sm focus-ring focus:border-ink"
            />
          ) : (
            <input
              id={f.name}
              type={f.type || 'text'}
              required={f.required}
              value={values[f.name] || ''}
              onChange={(e) => update(f.name, e.target.value)}
              className="w-full rounded-lg border border-line bg-paper px-4 py-3 text-sm focus-ring focus:border-ink"
            />
          )}
        </div>
      ))}

      {status === 'error' && (
        <p className="text-sm text-signal">Couldn't send that: {errorMsg}</p>
      )}

      <Button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : submitLabel}
      </Button>
    </form>
  )
}
