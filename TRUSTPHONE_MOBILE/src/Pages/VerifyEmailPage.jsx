import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheckIcon, EnvelopeIcon, ArrowLeftIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = location.state?.email || '';

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes
  const [isExpired, setIsExpired] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsExpired(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleChange = (index, value) => {
    const hexChar = value.replace(/[^a-fA-F0-9]/g, '').slice(-1);
    const newCode = [...code];
    newCode[index] = hexChar;
    setCode(newCode);
    setError('');

    if (hexChar && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/[^a-fA-F0-9]/g, '').slice(0, 6);
    const newCode = [...code];
    for (let i = 0; i < 6; i++) {
      newCode[i] = pasted[i] || '';
    }
    setCode(newCode);
    const nextEmpty = newCode.findIndex(c => !c);
    inputRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const fullCode = code.join('');

    if (fullCode.length < 6) {
      setError('Ingresa el código completo');
      return;
    }

    if (isExpired) {
      setError('El código ha expirado. Regístrate nuevamente.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/registroClientes/verifyCodeEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: emailFromState, verificationCodeRequest: fullCode })
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('¡Cuenta verificada correctamente!');
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000);
      } else {
        setError(data.message || 'Código incorrecto o expirado');
        setCode(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen flex flex-col shadow-xl overflow-hidden">
      <div className="bg-[#0b2240] px-6 pt-16 pb-10 flex flex-col items-center text-center">
        <div className="bg-blue-500/20 p-4 rounded-2xl mb-4 border border-blue-400/30">
          <EnvelopeIcon className="w-10 h-10 text-blue-300" />
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-wide">VERIFICA TU CORREO</h1>
        <p className="text-blue-300 text-xs font-semibold mt-1">Hemos enviado un código a {emailFromState}</p>
      </div>

      <div className="flex-1 bg-slate-50 px-6 pt-8 pb-10 flex flex-col">
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500 font-semibold">
            {isExpired ? 'El código ha expirado.' : `Tiempo restante: ${formatTime(timeLeft)}`}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-xs font-semibold p-3.5 rounded-2xl mb-4 flex items-center gap-2">
            <ExclamationCircleIcon className="w-5 h-5 flex-shrink-0" />
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-100 text-green-600 text-xs font-semibold p-3.5 rounded-2xl mb-4 flex items-center gap-2">
            <CheckCircleIcon className="w-5 h-5 flex-shrink-0" />
            {success}
          </div>
        )}

        <form onSubmit={handleVerify} className="flex-1 flex flex-col">
          <div className="flex justify-between gap-2 mb-8">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                disabled={loading || isExpired || success}
                className="w-12 h-14 text-center text-xl font-bold uppercase rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm"
              />
            ))}
          </div>

          <div className="mt-auto">
            <button
              type="submit"
              disabled={loading || isExpired || code.join('').length < 6 || success}
              className="w-full bg-[#0b2240] hover:bg-[#123057] active:scale-[0.98] text-white py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center disabled:opacity-60"
            >
              {loading ? 'Verificando...' : 'Verificar Cuenta'}
            </button>

            {isExpired && (
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="w-full mt-3 bg-white border border-gray-200 text-gray-700 py-3.5 rounded-2xl font-bold text-sm shadow-sm transition-all flex items-center justify-center active:bg-gray-50"
              >
                Volver a registrarse
              </button>
            )}

            <div className="text-center mt-6">
              <Link to="/login" className="inline-flex items-center gap-1 text-blue-600 font-bold hover:underline text-xs">
                <ArrowLeftIcon className="w-3 h-3" /> Volver al inicio de sesión
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
