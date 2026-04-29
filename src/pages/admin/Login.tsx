import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import { Button } from "../../components/ui/Button";

export function Login() {
  const { isAuthenticated, login } = useAdmin();
  const location = useLocation();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@bebemayor.com" && password === "admin1234") {
      login("demo-token");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 p-8 text-center">
          <div className="inline-block text-3xl font-black text-white">
            Bebé<span className="text-brand-accent">Mayor</span>
          </div>
          <p className="text-slate-400 font-medium mt-2 text-sm uppercase tracking-widest">Portal de Administración</p>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100 text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" 
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Contraseña</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" 
                required
              />
            </div>
            
            <Button type="submit" size="lg" className="w-full">
              Ingresar al panel
            </Button>
          </form>

          <div className="mt-8 bg-blue-50 p-4 rounded-xl text-sm border border-blue-100">
            <p className="font-bold text-blue-900 mb-1">Credenciales de demo:</p>
            <p className="text-blue-800 font-mono">Email: admin@bebemayor.com</p>
            <p className="text-blue-800 font-mono">Pass: admin1234</p>
          </div>
        </div>
      </div>
    </div>
  );
}
