'use client'

import Link from 'next/link'
import { getBasePath, resolvePath } from '@/lib/utils'

interface AppShellProps {
    children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
    const basePath = getBasePath()

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <header className="bg-[#0e0c9b] text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" legacyBehavior>
                            <a className="flex items-center gap-3">
                                <div className="flex items-center">
                                    <img
                                        src={resolvePath('/logo.png')}
                                        alt="GINEZ Logo"
                                        className="h-10 w-auto brightness-0 invert"
                                    />
                                </div>
                                <div className="hidden sm:block border-l border-white/20 pl-3 ml-2">
                                    <p className="text-xs text-white/90 uppercase tracking-wider font-semibold">Sistema de Gestión</p>
                                    <p className="text-[10px] text-white/70">Calidad y Documentación</p>
                                </div>
                            </a>
                        </Link>

                        <nav className="flex items-center gap-2">
                            <Link
                                href="/"
                                legacyBehavior
                            >
                                <a className="px-3 py-1.5 rounded-md text-sm font-medium hover:bg-white/10 transition-colors">
                                    Panel
                                </a>
                            </Link>
                            <Link
                                href="/catalog"
                                legacyBehavior
                            >
                                <a className="px-3 py-1.5 rounded-md text-sm font-medium hover:bg-white/10 transition-colors">
                                    Catálogo
                                </a>
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-400 font-medium">
                    <p>© 2026 Sistema de Gestión GINEZ. Todos los derechos reservados.</p>
                    <p>Versión 1.0.4</p>
                </div>
            </footer>
        </div>
    )
}
