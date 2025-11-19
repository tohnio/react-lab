import { Link } from 'react-router-dom';

export default function TailwindExample() {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Tailwind CSS</h2>
                    <p className="text-gray-600 mt-2">
                        Utility-first CSS framework para construção rápida de interfaces.
                    </p>
                </div>
                <Link to="/modern" className="text-blue-600 hover:underline">← Voltar</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Card Complexo */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 group hover:shadow-2xl transition-all duration-300">
                    <div className="h-32 bg-gradient-to-r from-purple-500 to-pink-500 relative">
                        <div className="absolute -bottom-12 left-6">
                            <img
                                src="https://ui-avatars.com/api/?name=Alex+Design&background=0D8ABC&color=fff&size=128"
                                alt="Profile"
                                className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                            />
                        </div>
                    </div>
                    <div className="pt-14 px-6 pb-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Alex Designer</h3>
                                <p className="text-sm text-gray-500">UI/UX Specialist</p>
                            </div>
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                Available
                            </span>
                        </div>

                        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                            Criando experiências digitais incríveis com foco em usabilidade e estética.
                            Apaixonado por Tailwind CSS e React.
                        </p>

                        <div className="flex gap-2 mb-6">
                            {['React', 'Tailwind', 'Figma'].map((tag) => (
                                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 bg-gray-900 text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm">
                                Follow
                            </button>
                            <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
                                Message
                            </button>
                        </div>
                    </div>
                </div>

                {/* Grid & Layout Demo */}
                <div className="space-y-6">
                    <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20 -ml-10 -mb-10"></div>

                        <h3 className="text-xl font-bold mb-4 relative z-10">Dark Mode & Gradients</h3>
                        <div className="space-y-3 relative z-10">
                            <div className="h-2 bg-slate-700 rounded w-3/4"></div>
                            <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                            <div className="h-2 bg-slate-700 rounded w-5/6"></div>
                        </div>

                        <div className="mt-6 flex gap-4 relative z-10">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 shadow-lg shadow-orange-500/20"></div>
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-cyan-500/20"></div>
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 shadow-lg shadow-teal-500/20"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 hover:scale-105 transition-transform cursor-pointer">
                            <div className="text-2xl mb-1">🚀</div>
                            <div className="font-bold text-blue-900">Fast</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 hover:scale-105 transition-transform cursor-pointer">
                            <div className="text-2xl mb-1">📱</div>
                            <div className="font-bold text-purple-900">Responsive</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
