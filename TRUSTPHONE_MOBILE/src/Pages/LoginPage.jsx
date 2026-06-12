import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ShieldCheckIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline'

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/loginClientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: email, contraseña: password })
      })
      const data = await res.json()
      if (res.ok) {
        // Fetch the client's full profile and store it
        const clientsRes = await fetch('/api/clientes')
        if (clientsRes.ok) {
          const clients = await clientsRes.json()
          const loggedIn = clients.find(c => c.correo?.trim().toLowerCase() === email.trim().toLowerCase())
          localStorage.setItem('user', JSON.stringify(loggedIn || { correo: email, nombre: 'Cliente' }))
        } else {
          localStorage.setItem('user', JSON.stringify({ correo: email, nombre: 'Cliente' }))
        }
        navigate(from, { replace: true })
      } else if (data.needsVerification) {
        navigate('/verify-email', { state: { email } })
      } else {
        setError(data.message || 'Credenciales inválidas. Revisa tu correo y contraseña.')
      }
    } catch {
      setError('Error al conectar con el servidor. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen flex flex-col shadow-xl overflow-hidden">
      {/* Top gradient header */}
      <div className="bg-[#0b2240] px-6 pt-16 pb-10 flex flex-col items-center text-center">
        <div className="bg-blue-500/20 p-4 rounded-2xl mb-4 border border-blue-400/30">
          <ShieldCheckIcon className="w-10 h-10 text-blue-300" />
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-wide">TRUSTPHONE</h1>
        <p className="text-blue-300 text-xs font-semibold mt-1">Smartphones certificados de confianza</p>
      </div>

      {/* Card form */}
      <div className="flex-1 bg-slate-50 px-6 pt-8 pb-10">
        <h2 className="text-xl font-extrabold text-gray-800 mb-1">Bienvenido de nuevo</h2>
        <p className="text-xs text-gray-500 font-semibold mb-6">Inicia sesión para continuar</p>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-xs font-semibold p-3.5 rounded-2xl mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 block">CORREO ELECTRÓNICO</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-sm"
              />
              <EnvelopeIcon className="w-4 h-4 text-gray-400 absolute left-4 top-4" />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 block">CONTRASEÑA</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-sm"
              />
              <LockClosedIcon className="w-4 h-4 text-gray-400 absolute left-4 top-4" />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0b2240] hover:bg-[#123057] active:scale-[0.98] text-white py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center mt-2 disabled:opacity-60"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión →'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 font-semibold mt-6">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-blue-600 font-bold hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
