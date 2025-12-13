'use client'

import { useState, useEffect } from 'react'
import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'

/* ---------------------------------------------
   1) VIEW ALERT (Reusable)
---------------------------------------------- */
export function ViewAlert({ isOpen, onClose, title, message, fields }) {
  if (!fields) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>

      <AlertBody>
        <div className="space-y-3">
          {Object.entries(fields).map(([label, value]) => (
            <div key={label} className="flex gap-2">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">{label}:</span>
              <span className="text-zinc-600 dark:text-zinc-400">{value}</span>
            </div>
          ))}
        </div>
      </AlertBody>

      <AlertActions>
        <Button color="dark/zinc" onClick={onClose}>Close</Button>
      </AlertActions>
    </Alert>
  )
}

/* ---------------------------------------------
   2) DELETE ALERT (Reusable)
---------------------------------------------- */
export function DeleteAlert({ isOpen, onClose, title, message, onConfirm }) {
  const [loading, setLoading] = useState(false)

  const handleDelete = () => {
    setLoading(true)
    setTimeout(() => {
      onConfirm()
      setLoading(false)
      onClose()
    }, 300)
  }

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>

      <AlertActions>
        <Button plain onClick={onClose} disabled={loading}>Cancel</Button>
        <Button color="red" onClick={handleDelete} disabled={loading}>
          {loading ? 'Deleting...' : 'Yes, Delete'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

/* ---------------------------------------------
   3) EDIT ALERT (Reusable dynamic form)
---------------------------------------------- */
export function EditAlert({
  isOpen,
  onClose,
  title,
  message,
  fields,              // { districtId: value, cityName: value }
  dropdowns = {},      // { districtId: [{id:1,name:'A'}] }
  onSave
}) {
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen) setForm(fields || {})
  }, [isOpen, fields])

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value })
  }

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      onSave(form)
      setLoading(false)
      onClose()
    }, 300)
  }

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>

      <AlertBody>
        <div className="space-y-4">
          {Object.entries(form).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {key}
              </label>

              {/* Dropdown Field */}
              {dropdowns[key] ? (
                <select
                  value={value}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value={0}>Select {key}</option>
                  {dropdowns[key].map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              ) : (
                /* Input Field */
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              )}
            </div>
          ))}
        </div>
      </AlertBody>

      <AlertActions>
        <Button plain onClick={onClose}>Cancel</Button>
        <Button color="dark/zinc" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

/* ============================================================
   4) ADD ALERT (Dynamic form for adding new data)
============================================================ */


export function AddAlert({
  isOpen,
  onClose,
  title,
  message,
  fields,

  dropdowns = {},
  onSave
}) {
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen) setForm(fields || {})
  }, [isOpen, fields])

  const updateField = (key, value) => {
    setForm({ ...form, [key]: value })
  }

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      onSave(form)
      setLoading(false)
      onClose()
    }, 300)
  }

  if (!isOpen) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>

      <AlertBody>
        <div className="space-y-4">
          {Object.entries(form).map(([key, value]) => (
            <div key={key} className="space-y-1.5">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {key}
              </label>

              {dropdowns[key] ? (
                <select
                  value={value}
                  onChange={(e) => updateField(key, e.target.value)}
                  className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800"
                >
                  <option value="">Select {key}</option>
                  {dropdowns[key].map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => updateField(key, e.target.value)}
                  className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800"
                />
              )}
            </div>
          ))}
        </div>
      </AlertBody>

      <AlertActions>
        <Button plain onClick={onClose} disabled={loading}>Cancel</Button>
        <Button color="dark/zinc" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Adding...' : 'Add'}
        </Button>
      </AlertActions>
    </Alert>
  )
}
