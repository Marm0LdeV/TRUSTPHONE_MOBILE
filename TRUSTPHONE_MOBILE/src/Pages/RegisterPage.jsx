import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShieldCheckIcon, UserIcon, EnvelopeIcon, LockClosedIcon, PhoneIcon } from '@heroicons/react/24/outline'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nombre: '',
    Apellido: '',
    correo: '',
    contraseña: '',
    confirmPassword: '',
    telefono: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.contraseña !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/registroClientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          Apellido: formData.Apellido,
          correo: formData.correo,
          contraseña: formData.contraseña,
          telefono: formData.telefono
        })
      })
      const data = await res.json()
      if (res.ok) {
        navigate('/verify-email', { state: { email: formData.correo } })
      } else {
        setError(data.message || 'Error al registrar. Intenta de nuevo.')
      }
    } catch {
      setError('Error al conectar con el servidor.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen flex flex-col shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-[#0b2240] px-6 pt-12 pb-8 flex flex-col items-center text-center">
        <div className="bg-blue-500/20 p-4 rounded-2xl mb-3 border border-blue-400/30">
          <ShieldCheckIcon className="w-8 h-8 text-blue-300" />
        </div>
        <h1 className="text-xl font-extrabold text-white tracking-wide">TRUSTPHONE</h1>
        <p className="text-blue-300 text-xs font-semibold mt-1">Crea tu cuenta y empieza a comprar</p>
      </div>

      {/* Form */}
      <div className="flex-1 bg-slate-50 px-6 pt-6 pb-10">
        <h2 className="text-xl font-extrabold text-gray-800 mb-1">Crear cuenta</h2>
        <p className="text-xs text-gray-500 font-semibold mb-5">Completa tus datos para registrarte</p>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-xs font-semibold p-3.5 rounded-2xl mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-3">
          {/* Nombre */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 block">NOMBRE *</label>
              <div className="relative">
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Juan"
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                />
                <UserIcon className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 block">APELLIDO *</label>
              <div className="relative">
                <input
                  type="text"
                  name="Apellido"
                  value={formData.Apellido}
                  onChange={handleChange}
                  required
                  placeholder="Pérez"
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
                />
                <UserIcon className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-500 block">CORREO ELECTRÓNICO *</label>
            <div className="relative">
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
                placeholder="correo@ejemplo.com"
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
              />
              <EnvelopeIcon className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Teléfono */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-500 block">TELÉFONO</label>
            <div className="relative">
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+503 0000-0000"
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
              />
              <PhoneIcon className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-500 block">CONTRASEÑA *</label>
            <div className="relative">
              <input
                type="password"
                name="contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                required
                placeholder="Mínimo 6 caracteres"
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
              />
              <LockClosedIcon className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-500 block">CONFIRMAR CONTRASEÑA *</label>
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Repite tu contraseña"
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
              />
              <LockClosedIcon className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0b2240] hover:bg-[#123057] active:scale-[0.98] text-white py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center mt-2 disabled:opacity-60"
          >
            {loading ? 'Creando cuenta...' : 'Crear Cuenta →'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 font-semibold mt-5">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
