import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  ArrowLeftIcon, 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  CalendarIcon,
  PencilIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'
import Footer from '../Components/Footer'

const PersonalInfoPage = () => {
  const navigate = useNavigate()
  const [client, setClient] = useState(null)
  
  const [formData, setFormData] = useState({
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    phone: '+34 600 000 000',
    birthdate: '1992-05-15'
  })

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setClient(parsed);
      setFormData({
        name: `${parsed.nombre || ''} ${parsed.Apellido || ''}`.trim() || 'Usuario',
        email: parsed.correo || '',
        phone: parsed.telefono || '',
        birthdate: '1992-05-15'
      });
    } else {
      // No session — redirect to login
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = async () => {
    try { await fetch('/api/logout', { method: 'POST' }) } catch {}
    localStorage.removeItem('user')
    localStorage.removeItem('cart')
    navigate('/login', { replace: true })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (!client) {
      alert('Cargando información, intenta de nuevo.');
      return;
    }

    const parts = formData.name.trim().split(' ');
    const nombre = parts[0];
    const Apellido = parts.slice(1).join(' ') || ' ';

    fetch(`/api/clientes/${client._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre,
        Apellido,
        correo: formData.email,
        telefono: formData.phone
      })
    })
      .then(res => {
        if (res.ok) {
          alert('¡Cambios guardados con éxito!');
          const updated = { ...client, nombre, Apellido, correo: formData.email, telefono: formData.phone };
          localStorage.setItem('user', JSON.stringify(updated));
          setClient(updated);
          navigate('/')
        } else {
          alert('Error al guardar cambios.');
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error al conectar con el servidor.');
      });
  }

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen pb-24 shadow-xl flex flex-col justify-between relative overflow-hidden">
      <div>
        {/* Header */}
        <div className="bg-[#0b2240] px-4 py-4 flex items-center border-b border-[#0d284a] shadow-md">
          <Link to="/" className="text-white hover:opacity-80 transition flex-shrink-0">
            <ArrowLeftIcon className="w-5 h-5 stroke-[2.5]" />
          </Link>
          <h1 className="text-white font-bold text-base flex-1 text-center pr-5">Información Personal</h1>
        </div>

        {/* Avatar Area */}
        <div className="py-6 flex flex-col items-center bg-white border-b border-gray-100">
          <div className="relative w-24 h-24">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-100 shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256&h=256&fit=crop" 
                alt="Juan Pérez" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Camera/Edit Button */}
            <button 
              onClick={() => alert('Cambiar foto de perfil (simulado)')}
              className="absolute bottom-0 right-0 bg-[#0b2240] hover:bg-[#123057] text-white p-2 rounded-full border-2 border-white shadow-sm transition-all"
            >
              <PencilIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="p-4 space-y-4">
          {/* Nombre Completo */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 block">
              Nombre Completo
            </label>
            <div className="relative">
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-xs font-bold text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
              />
              <UserIcon className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
            </div>
          </div>

          {/* Correo Electrónico */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 block">
              Correo Electrónico
            </label>
            <div className="relative">
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-xs font-bold text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
              />
              <EnvelopeIcon className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
            </div>
          </div>

          {/* Número de Teléfono */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 block">
              Número de Teléfono
            </label>
            <div className="relative">
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-xs font-bold text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
              />
              <PhoneIcon className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
            </div>
          </div>

          {/* Fecha de Nacimiento */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 block">
              Fecha de Nacimiento
            </label>
            <div className="relative">
              <input 
                type="date" 
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-xs font-bold text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
              />
              <CalendarIcon className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
            </div>
          </div>

          {/* Save Button */}
          <button 
            type="submit"
            className="w-full bg-[#0b2240] hover:bg-[#123057] active:scale-[0.98] text-white py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center mt-6"
          >
            Guardar Cambios
          </button>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 active:scale-[0.98] text-red-600 py-3.5 rounded-2xl font-bold text-sm border border-red-100 transition-all mt-3"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Cerrar Sesión
          </button>
        </form>
      </div>

      <Footer />
    </div>
  )
}

export default PersonalInfoPage
