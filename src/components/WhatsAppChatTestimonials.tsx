'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function WhatsAppChatTestimonials() {
  const [activeTab, setActiveTab] = useState<'aissatou' | 'moussa' | 'ibrahima'>('aissatou');

  const chats = {
    aissatou: {
      name: "Aïssatou Ndiaye",
      tag: "Boutique SunuStyle (Dakar)",
      avatar: "/aissatou.jpg",
      status: "En ligne",
      messages: [
        {
          id: 1,
          sender: "client",
          text: "Salut ! J'espère que vous allez bien ?",
          time: "14:15",
        },
        {
          id: 2,
          sender: "client",
          text: "Je voulais te remercier pour le site e-commerce SunuStyle. Au début j'hésitais un peu pour la vente en ligne...",
          time: "14:16",
        },
        {
          id: 3,
          sender: "client",
          text: "Mais là franchement les clients paient direct sur Wave sans m'appeler toutes les 2 minutes ! Mes ventes ont grave augmenté ce mois-ci merciii 😍🙏",
          time: "14:17",
        },
        {
          id: 4,
          sender: "yaakar",
          text: "Merci Aïssatou ! C'est un vrai plaisir de voir ton business grandir à Dakar. On reste ensemble ! 🙏🇸🇳",
          time: "14:20",
        }
      ]
    },
    moussa: {
      name: "Moussa Diop",
      tag: "Restaurant Teranga (Thiès)",
      avatar: "/moussa.jpg",
      status: "Vu aujourd'hui à 11:42",
      messages: [
        {
          id: 1,
          sender: "client",
          text: "Salam alaykoum Yakaar Web !",
          time: "11:38",
        },
        {
          id: 2,
          sender: "client",
          text: "Waw le site du restaurant est au top ! Livré en 8 jours seulement, c'est du travail rapide et propre 👏",
          time: "11:40",
        },
        {
          id: 3,
          sender: "client",
          text: "Maintenant les clients sur place scannent le QR code sur la table et réservent leurs commandes sur leur téléphone. On gagne tellement de temps !",
          time: "11:42",
        },
        {
          id: 4,
          sender: "yaakar",
          text: "Wa alaykoum salam Moussa ! Merci à toute l'équipe du restaurant. Content que le QR menu simplifie le service 🔥",
          time: "11:45",
        }
      ]
    },
    ibrahima: {
      name: "Ibrahima Sarr",
      tag: "Diaspora (Paris / Dakar)",
      avatar: "/ibrahima.jpg",
      status: "En ligne",
      messages: [
        {
          id: 1,
          sender: "client",
          text: "Salut l'équipe ! Petit message depuis Paris pour vous donner des nouvelles.",
          time: "18:05",
        },
        {
          id: 2,
          sender: "client",
          text: "Franchement super satisfait du site vitrine. Gérer la création à distance depuis la France n'était pas simple au début, mais la communication sur WhatsApp était fluide et efficace.",
          time: "18:07",
        },
        {
          id: 3,
          sender: "client",
          text: "J'ai déjà reçu 3 demandes de devis de clients à Dakar cette semaine. Merci pour le sérieux !",
          time: "18:09",
        },
        {
          id: 4,
          sender: "yaakar",
          text: "Merci beaucoup Ibrahima ! C'est toujours un plaisir de travailler avec la diaspora. Plein de succès !",
          time: "18:12",
        }
      ]
    }
  };

  const currentChat = chats[activeTab];

  return (
    <section className="py-16 lg:py-24 bg-brand-light">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center space-y-3 mb-12">
          <span className="bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            Échanges Clients WhatsApp
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-dark">
            Les messages réels de nos clients 💬
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Découvrez nos vraies conversations WhatsApp avec nos clients à Dakar, Thiès et dans la diaspora.
          </p>

          {/* Tab Selector */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={() => setActiveTab('aissatou')}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm ${
                activeTab === 'aissatou'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <div className="w-6 h-6 rounded-full overflow-hidden relative border border-white">
                <Image src="/aissatou.jpg" alt="Aïssatou" fill className="object-cover" />
              </div>
              <span>Aïssatou Ndiaye (Dakar)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('moussa')}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm ${
                activeTab === 'moussa'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <div className="w-6 h-6 rounded-full overflow-hidden relative border border-white">
                <Image src="/moussa.jpg" alt="Moussa" fill className="object-cover" />
              </div>
              <span>Moussa Diop (Thiès)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('ibrahima')}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm ${
                activeTab === 'ibrahima'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <div className="w-6 h-6 rounded-full overflow-hidden relative border border-white">
                <Image src="/ibrahima.jpg" alt="Ibrahima" fill className="object-cover" />
              </div>
              <span>Ibrahima Sarr (Diaspora)</span>
            </button>
          </div>
        </div>

        {/* PIXEL-PERFECT WHATSAPP SMARTPHONE INTERFACE */}
        <div className="relative bg-[#0b141a] rounded-[36px] overflow-hidden shadow-2xl border-4 border-gray-800 max-w-md mx-auto font-sans">
          {/* Centered Dynamic Island Notch */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4.5 bg-black rounded-full shadow-md z-20 pointer-events-none flex items-center justify-end px-2">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800"></div>
          </div>

          {/* iOS Top Status Bar */}
          <div className="bg-[#202c33] px-6 pt-3 pb-1 flex justify-between items-center text-xs text-gray-200 font-semibold tracking-tight relative z-10">
            <span>09:41</span>
            <div className="flex items-center gap-2">
              {/* Cellular Signal Bar SVG */}
              <svg className="w-4 h-3 fill-current text-white" viewBox="0 0 18 12">
                <rect x="0" y="8" width="2.5" height="4" rx="0.5" />
                <rect x="4" y="5.5" width="2.5" height="6.5" rx="0.5" />
                <rect x="8" y="3" width="2.5" height="9" rx="0.5" />
                <rect x="12" y="0.5" width="2.5" height="11.5" rx="0.5" />
              </svg>

              {/* WiFi Icon SVG */}
              <svg className="w-4 h-3 fill-current text-white" viewBox="0 0 16 12">
                <path d="M8 9.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zm0-3.5c1.47 0 2.8.56 3.8 1.48l-1.3 1.3A3.95 3.95 0 0 0 8 7.5c-.95 0-1.83.33-2.5.88L4.2 7.08A5.95 5.95 0 0 1 8 6zm0-3.5c2.42 0 4.63.92 6.3 2.45l-1.3 1.3A7.45 7.45 0 0 0 8 4c-1.92 0-3.66.72-5 1.9L1.7 4.55A9.45 9.45 0 0 1 8 2.5z" />
              </svg>

              {/* Battery Icon SVG */}
              <svg className="w-6 h-3 fill-none stroke-current text-white" viewBox="0 0 22 11">
                <rect x="0.5" y="0.5" width="18" height="10" rx="2.5" strokeWidth="1" />
                <rect x="2" y="2" width="13" height="7" rx="1.5" className="fill-white stroke-none" />
                <path d="M20 3.5v4" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* WhatsApp App Header */}
          <div className="bg-[#202c33] px-4 py-3 text-white flex items-center justify-between border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden relative border border-emerald-500 shadow-md flex-shrink-0">
                <Image 
                  src={currentChat.avatar} 
                  alt={currentChat.name} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight text-gray-100">{currentChat.name}</h3>
                <p className="text-[11px] text-emerald-400 font-medium">{currentChat.status}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-300">
              <svg className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
              </svg>
              <svg className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </div>
          </div>

          {/* WhatsApp Chat Body with Classy Background Wallpaper */}
          <div 
            className="p-4 space-y-3.5 min-h-[400px] flex flex-col justify-end bg-cover bg-center relative"
            style={{ 
              backgroundImage: `linear-gradient(to bottom, rgba(11, 20, 26, 0.82), rgba(11, 20, 26, 0.88)), url('/whatsapp-bg.jpg')`
            }}
          >
            {/* Encryption Notice */}
            <div className="text-center my-1">
              <span className="bg-[#182229] text-[#8696a0] text-[10px] px-3 py-1 rounded-lg border border-[#222d34] shadow-sm inline-block">
                🔒 Messages chiffrés de bout en bout.
              </span>
            </div>

            {currentChat.messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'client' ? 'justify-start' : 'justify-end'}`}
              >
                <div 
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl relative shadow-md text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'client' 
                      ? 'bg-[#202c33] text-gray-100 rounded-tl-none' 
                      : 'bg-[#005c4b] text-white rounded-tr-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-gray-400">
                    <span>{msg.time}</span>
                    {msg.sender === 'yaakar' && (
                      <span className="text-[#53bdeb] font-bold">✓✓</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* WhatsApp Footer Input Bar */}
          <div className="bg-[#202c33] px-3 py-2.5 flex items-center gap-3 border-t border-gray-700/50">
            <span className="text-[#8696a0] text-xl cursor-pointer">😊</span>
            <div className="flex-1 bg-[#2a3942] text-gray-300 rounded-full px-4 py-2 text-xs">
              Envoyer un message...
            </div>
            <div className="w-9 h-9 bg-[#00a884] rounded-full flex items-center justify-center text-white shadow font-bold cursor-pointer hover:bg-[#008f70] transition-colors">
              <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* WhatsApp Action Button */}
        <div className="mt-8 text-center">
          <a
            href="https://wa.me/221775439397?text=Bonjour%20Yakaar%20Web%2C%20je%20souhaite%20lancer%20mon%20projet%20web"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-emerald-600 text-white px-8 py-3.5 rounded-full font-bold text-base hover:bg-emerald-500 transition-all shadow-xl"
          >
            <span>Discuter directement avec nous sur WhatsApp 📲</span>
          </a>
        </div>
      </div>
    </section>
  );
}
