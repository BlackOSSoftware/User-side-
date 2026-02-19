"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
    Search, Plus, MessageSquare, Inbox, ChevronLeft, ChevronRight,
    Send, Clock, Shield, User, AlertCircle, CheckCircle, ArrowLeft, MoreVertical,
    Calendar, CreditCard, Mail, Phone, Edit3, Trash2, X, Check, Paperclip, AlertOctagon
} from 'lucide-react';
import { clsx } from 'clsx';
import { format } from 'date-fns';

// --- Types (Matching Ticket Model) ---
interface Message {
    _id: string;
    sender: 'USER' | 'ADMIN';
    message: string;
    timestamp: Date;
}

interface SupportTicket {
    _id: string;
    ticketId: string;
    subject: string;
    category: 'TECHNICAL' | 'PAYMENT' | 'ACCOUNT' | 'OTHER';
    priority: 'Low' | 'Medium' | 'High';
    status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
    createdAt: Date;
    updatedAt: Date;
    messages: Message[];
    user?: {
        name: string;
        email: string;
        phone?: string;
        clientId?: string;
        createdAt?: Date;
    };
    ipAddress?: string;
}

// --- Mock Data ---
const MOCK_USER = {
    name: 'Aqib Khan',
    email: 'aqib@example.com',
    phone: '+91 9876543210',
    clientId: 'CLI-9921',
    createdAt: new Date('2025-01-01')
};

const MOCK_TICKETS: SupportTicket[] = [
    {
        _id: '1',
        ticketId: 'TKT-1736672400',
        subject: 'Payment not reflecting in dashboard',
        category: 'PAYMENT',
        priority: 'High',
        status: 'Open',
        createdAt: new Date(Date.now() - 86400000),
        updatedAt: new Date(Date.now() - 86400000),
        ipAddress: '192.168.1.1',
        user: MOCK_USER,
        messages: [
            { _id: 'm1', sender: 'USER', message: 'I made a payment of ₹5000 via UPI but my plan is still showing as Trial.', timestamp: new Date(Date.now() - 86400000) }
        ]
    },
    {
        _id: '2',
        ticketId: 'TKT-1736675000',
        subject: 'Cannot connect strategy to Binance API',
        category: 'TECHNICAL',
        priority: 'Medium',
        status: 'In Progress',
        createdAt: new Date(Date.now() - 172800000),
        updatedAt: new Date(Date.now() - 3600000),
        ipAddress: '103.44.22.11',
        user: MOCK_USER,
        messages: [
            { _id: 'm2', sender: 'USER', message: 'Facing 401 Unauthorized while connecting Binance API.', timestamp: new Date(Date.now() - 172800000) },
            { _id: 'm3', sender: 'ADMIN', message: 'Please ensure your API keys have "Enable Spot & Margin Trading" and "Enable Reading" permissions.', timestamp: new Date(Date.now() - 3600000) }
        ]
    },
    {
        _id: '3',
        ticketId: 'TKT-1736680000',
        subject: 'How to renewal my platinum plan?',
        category: 'ACCOUNT',
        priority: 'Low',
        status: 'Resolved',
        createdAt: new Date(Date.now() - 604800000),
        updatedAt: new Date(Date.now() - 600000000),
        ipAddress: '157.2.33.44',
        user: MOCK_USER,
        messages: [
            { _id: 'm4', sender: 'USER', message: 'My platinum plan expires in 2 days. How to renew?', timestamp: new Date(Date.now() - 604800000) },
            { _id: 'm5', sender: 'ADMIN', message: 'You can go to the Plans & Pricing section and click on Renew.', timestamp: new Date(Date.now() - 600000000) }
        ]
    }
];

// --- Sub-Components (Styled after Admin Panel) ---

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'High': return 'text-red-500 bg-red-500/10 border-red-500/20';
        case 'Medium': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
        default: return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
    }
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Open': return 'text-blue-500';
        case 'In Progress': return 'text-blue-500';
        case 'Resolved': return 'text-emerald-500';
        default: return 'text-muted-foreground';
    }
};

export default function SupportPage() {
    const [view, setView] = useState<'LIST' | 'DETAIL' | 'CREATE'>('LIST');
    const [tickets, setTickets] = useState<SupportTicket[]>(MOCK_TICKETS);
    const [activeTab, setActiveTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);

    // Create Ticket Form State
    const [newSubject, setNewSubject] = useState('');
    const [newCategory, setNewCategory] = useState<'TECHNICAL' | 'PAYMENT' | 'ACCOUNT' | 'OTHER'>('TECHNICAL');
    const [newPriority, setNewPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
    const [newDescription, setNewDescription] = useState('');

    // Detail View State
    const [reply, setReply] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Filter Logic (Matching AllTickets.jsx)
    const filteredTickets = tickets.filter(t => {
        const matchesSearch = t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.ticketId.toLowerCase().includes(searchTerm.toLowerCase());

        let matchesTab = true;
        if (activeTab === 'open') matchesTab = t.status === 'Open' || t.status === 'In Progress';
        if (activeTab === 'resolved') matchesTab = t.status === 'Resolved' || t.status === 'Closed';

        return matchesSearch && matchesTab;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTickets = filteredTickets.slice(indexOfFirstItem, indexOfLastItem);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, searchTerm, itemsPerPage]);

    // Auto-scroll for chat
    useEffect(() => {
        if (view === 'DETAIL' && chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [view, selectedTicket]);

    return (
        <div className="h-[calc(100vh-3rem)] flex flex-col gap-2">
            {view === 'LIST' && (
                <>
                    {/* Toolbar (Matching AllTickets.jsx) */}
                    <div className="shrink-0 bg-card border border-white/5 p-3 rounded-lg shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full lg:w-auto">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2 shrink-0">
                                <MessageSquare size={16} className="text-primary" />
                                Support Helpdesk
                            </h2>
                            <div className="hidden md:block h-6 w-[1px] bg-white/10"></div>
                            <div className="flex items-center gap-1">
                                {['all', 'open', 'resolved'].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={clsx(
                                            "px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded transition-all border",
                                            activeTab === tab
                                                ? (tab === 'open' ? 'bg-red-500/20 text-red-500 border-red-500/20' :
                                                    tab === 'resolved' ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/20' :
                                                        'bg-primary/20 text-primary border-primary/20')
                                                : "text-muted-foreground border-transparent hover:bg-white/5 hover:text-foreground"
                                        )}
                                    >
                                        {tab === 'all' ? 'All Tickets' : tab === 'open' ? `Open (${tickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length})` : 'Resolved'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative group w-full md:w-auto">
                                <Search className="absolute left-3 top-2.5 text-muted-foreground" size={12} />
                                <input
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    type="text"
                                    placeholder="SEARCH TICKET..."
                                    className="bg-secondary/30 border border-white/5 h-9 pl-9 pr-3 w-full md:w-56 text-[11px] font-mono rounded-lg focus:border-primary/50 focus:bg-secondary/50 focus:outline-none transition-all"
                                />
                            </div>
                            <button
                                onClick={() => setView('CREATE')}
                                className="flex items-center gap-2 bg-primary px-4 h-9 rounded-lg text-[10px] font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 shrink-0"
                            >
                                <Plus size={14} /> Open Ticket
                            </button>
                        </div>
                    </div>

                    {/* Table (Matching TicketTable.jsx) */}
                    <div className="flex-1 min-h-0 bg-card border border-border rounded-lg shadow-2xl overflow-hidden flex flex-col relative">
                        {/* Table Header Backdrop */}
                        <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                        <div className="overflow-auto flex-1 custom-scrollbar">
                            <table className="w-full text-left whitespace-nowrap">
                                <thead className="bg-muted/50 sticky top-0 z-10 uppercase tracking-widest text-[9px] font-bold text-muted-foreground border-b border-border shadow-sm backdrop-blur-md">
                                    <tr>
                                        <th className="px-5 py-3 border-r border-border bg-muted/90 backdrop-blur-sm">Ticket ID</th>
                                        <th className="px-5 py-3 border-r border-border bg-muted/90 backdrop-blur-sm">Subject</th>
                                        <th className="px-5 py-3 border-r border-border bg-muted/90 backdrop-blur-sm text-center">User</th>
                                        <th className="px-5 py-3 border-r border-border bg-muted/90 backdrop-blur-sm text-center">IP Address</th>
                                        <th className="px-5 py-3 border-r border-border bg-muted/90 backdrop-blur-sm text-center">Priority</th>
                                        <th className="px-5 py-3 border-r border-border bg-muted/90 backdrop-blur-sm text-center">Status</th>
                                        <th className="px-5 py-3 border-r border-border bg-muted/90 backdrop-blur-sm text-center">Date</th>
                                        <th className="px-5 py-3 text-center bg-muted/90 backdrop-blur-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 bg-transparent text-[11px] font-medium font-mono">
                                    {currentTickets.length > 0 ? currentTickets.map((ticket, idx) => (
                                        <tr key={idx} className="hover:bg-primary/[0.02] transition-colors group relative">
                                            <td className="px-5 py-3 border-r border-border font-bold text-muted-foreground">
                                                {ticket.ticketId}
                                            </td>
                                            <td className="px-5 py-3 border-r border-border">
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-foreground font-sans font-bold">{ticket.subject}</span>
                                                    <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground">
                                                        <span className="bg-secondary px-1 py-0.5 rounded uppercase">{ticket.category}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3 border-r border-border">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-[9px] font-bold border border-white/10 uppercase">
                                                        AK
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-foreground text-[10px] font-bold">{MOCK_USER.name}</span>
                                                        <span className="text-[9px] text-muted-foreground">{MOCK_USER.email}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3 border-r border-border font-mono text-muted-foreground text-center">
                                                {ticket.ipAddress}
                                            </td>
                                            <td className="px-5 py-3 text-center border-r border-border">
                                                <span className={clsx("px-2 py-0.5 border rounded-[4px] text-[9px] uppercase font-bold tracking-wider", getPriorityColor(ticket.priority))}>
                                                    {ticket.priority}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 text-center border-r border-border">
                                                <div className={clsx("flex items-center justify-center gap-1 font-bold uppercase tracking-wider text-[10px]", getStatusColor(ticket.status))}>
                                                    {ticket.status === 'Open' || ticket.status === 'In Progress' ? <AlertCircle size={10} /> : <CheckCircle size={10} />}
                                                    {ticket.status}
                                                </div>
                                            </td>
                                            <td className="px-5 py-3 text-center border-r border-border text-muted-foreground uppercase">
                                                {format(ticket.createdAt, 'dd MMM yyyy')}
                                            </td>
                                            <td className="px-5 py-3 text-center">
                                                <button
                                                    onClick={() => { setSelectedTicket(ticket); setView('DETAIL'); }}
                                                    className="p-1.5 hover:bg-muted/20 rounded text-muted-foreground hover:text-foreground transition-all"
                                                >
                                                    <MessageSquare size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={8} className="py-20 text-center text-muted-foreground opacity-50 uppercase tracking-[0.2em] font-bold">
                                                <Inbox size={48} className="mx-auto mb-4 opacity-20" />
                                                No Tickets Found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Footer Stats & Pagination (Matching Admin Panel) */}
                    <div className="h-9 bg-muted/10 border border-white/5 rounded-lg flex items-center justify-between px-4 text-[10px] font-mono text-muted-foreground uppercase tracking-wider shrink-0 backdrop-blur-sm">
                        <div className="flex items-center gap-4">
                            <span>
                                {filteredTickets.length > 0 ? (
                                    <>Showing <span className="text-foreground font-bold">{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredTickets.length)}</span> of <span className="text-foreground font-bold">{filteredTickets.length}</span></>
                                ) : (
                                    <span className="text-muted-foreground">No tickets found</span>
                                )}
                                <span className="text-muted-foreground/50 mx-2">|</span>
                                Total: <span className="text-foreground font-bold">{tickets.length}</span>
                            </span>
                            <div className="ml-4 flex items-center gap-2">
                                <span>Show:</span>
                                <select
                                    value={itemsPerPage}
                                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                    className="bg-transparent text-foreground font-bold border-b border-white/10 focus:outline-none focus:border-primary cursor-pointer pb-0.5"
                                >
                                    {[10, 20, 50].map(val => (
                                        <option key={val} value={val} className="bg-[#0f172a]">{val}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="mr-2">Page {currentPage} of {totalPages || 1}</span>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="p-1 hover:bg-white/10 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft size={14} />
                                </button>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    className="p-1 hover:bg-white/10 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {view === 'DETAIL' && selectedTicket && (
                <div className="flex-1 flex flex-col gap-3 max-w-[1600px] mx-auto w-full">
                    {/* Detail Header (Matching TicketDetails.jsx) */}
                    <div className="shrink-0 flex items-center justify-between bg-card border border-white/5 p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setView('LIST')} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                                <ArrowLeft size={18} />
                            </button>
                            <div>
                                <div className="flex items-center gap-3">
                                    <h1 className="text-xl font-bold text-foreground font-mono">{selectedTicket.ticketId}</h1>
                                    <span className={clsx("px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider",
                                        selectedTicket.status === 'Open' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                                            selectedTicket.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                                                'bg-secondary text-muted-foreground border border-white/5'
                                    )}>
                                        {selectedTicket.status}
                                    </span>
                                    <span className={clsx("px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border", getPriorityColor(selectedTicket.priority))}>
                                        {selectedTicket.priority} Priority
                                    </span>
                                </div>
                                <p className="text-sm text-foreground/80 mt-1 font-medium">{selectedTicket.subject}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded text-[11px] font-bold uppercase transition-all shadow-lg shadow-emerald-500/20">
                                <CheckCircle size={14} /> Mark Resolved
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4">
                        {/* Conversation (Matching Admin Chat Style) */}
                        <div className="flex-1 bg-card border border-white/5 rounded-xl flex flex-col overflow-hidden shadow-lg relative min-h-[500px] lg:min-h-0">
                            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/20 to-transparent pointer-events-none z-10" />

                            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar font-sans">
                                {selectedTicket.messages.map((msg, idx) => (
                                    <div key={idx} className={clsx("flex gap-4 max-w-3xl group", msg.sender === 'ADMIN' ? 'flex-row' : 'ml-auto flex-row-reverse')}>
                                        <div className={clsx(
                                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border shadow-inner",
                                            msg.sender === 'ADMIN' ? 'bg-primary/20 text-primary border-primary/20' : 'bg-secondary/50 text-muted-foreground border-white/5'
                                        )}>
                                            {msg.sender === 'ADMIN' ? <Shield size={14} /> : <User size={14} />}
                                        </div>

                                        <div className={clsx(
                                            "rounded-2xl p-4 text-[13px] leading-relaxed shadow-sm min-w-[200px] relative transition-all",
                                            msg.sender === 'ADMIN'
                                                ? 'bg-primary/10 text-foreground border border-primary/20 rounded-tl-none'
                                                : 'bg-secondary/40 text-foreground border border-white/5 rounded-tr-none'
                                        )}>
                                            <div className="flex justify-between items-center mb-2 gap-8 opacity-60 text-[10px] uppercase font-bold tracking-wider">
                                                <span>{msg.sender === 'ADMIN' ? 'Support Team' : 'Me (Aqib Khan)'}</span>
                                                <span className="flex items-center gap-1"><Clock size={10} /> {format(msg.timestamp, 'HH:mm')}</span>
                                            </div>
                                            <p className="whitespace-pre-wrap">{msg.message}</p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={chatEndRef} />
                            </div>

                            <div className="p-4 border-t border-white/5 bg-secondary/10 backdrop-blur-sm">
                                <div className="flex gap-4 items-end">
                                    <div className="flex-1 relative">
                                        <textarea
                                            value={reply}
                                            onChange={(e) => setReply(e.target.value)}
                                            placeholder="Type your message..."
                                            rows={1}
                                            className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary/50 focus:bg-background/80 focus:outline-none resize-none min-h-[50px] max-h-[150px] transition-all"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    if (!reply.trim()) return;
                                                    const newMsg = { _id: Date.now().toString(), sender: 'USER', message: reply, timestamp: new Date() };
                                                    const updated = { ...selectedTicket, messages: [...selectedTicket.messages, newMsg as any] };
                                                    setTickets(tickets.map(t => t._id === updated._id ? updated : t));
                                                    setSelectedTicket(updated);
                                                    setReply('');
                                                }
                                            }}
                                        />
                                    </div>
                                    <button
                                        className="h-[50px] w-[50px] rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20 disabled:opacity-50"
                                        disabled={!reply.trim()}
                                        onClick={() => {
                                            const newMsg = { _id: Date.now().toString(), sender: 'USER', message: reply, timestamp: new Date() };
                                            const updated = { ...selectedTicket, messages: [...selectedTicket.messages, newMsg as any] };
                                            setTickets(tickets.map(t => t._id === updated._id ? updated : t));
                                            setSelectedTicket(updated);
                                            setReply('');
                                        }}
                                    >
                                        <Send size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar (Matching TicketDetails Info) */}
                        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-4">
                            <div className="bg-card border border-white/5 rounded-xl p-5 shadow-sm">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                                    <User size={14} /> My Profile
                                </h3>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center text-lg font-bold text-foreground">
                                        AK
                                    </div>
                                    <div className="overflow-hidden">
                                        <h4 className="font-bold text-foreground truncate">{MOCK_USER.name}</h4>
                                        <p className="text-xs text-muted-foreground truncate">{MOCK_USER.email}</p>
                                    </div>
                                </div>
                                <div className="space-y-3 font-mono">
                                    <div className="flex items-center gap-3 text-xs p-2 bg-secondary/20 rounded-lg border border-white/5">
                                        <Phone size={14} className="text-muted-foreground shrink-0" />
                                        <span className="text-foreground/80">{MOCK_USER.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs p-2 bg-secondary/20 rounded-lg border border-white/5">
                                        <CreditCard size={14} className="text-muted-foreground shrink-0" />
                                        <span className="text-foreground/80">ID: <span className="text-primary">{MOCK_USER.clientId}</span></span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs p-2 bg-secondary/20 rounded-lg border border-white/5">
                                        <Calendar size={14} className="text-muted-foreground shrink-0" />
                                        <span className="text-foreground/80">Joined: Jan 2025</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-card border border-white/5 rounded-xl p-5 shadow-sm flex-1">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                                    <AlertOctagon size={14} /> Ticket Info
                                </h3>
                                <div className="space-y-4 text-[10px] font-mono uppercase">
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Category</span>
                                        <span className="bg-secondary px-2 py-1 rounded font-bold">{selectedTicket.category}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">IP Address</span>
                                        <span className="text-foreground/80">{selectedTicket.ipAddress}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Last Updated</span>
                                        <span className="text-foreground/80">{format(selectedTicket.updatedAt, 'MMM dd, HH:mm')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {view === 'CREATE' && (
                <div className="max-w-4xl mx-auto w-full space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setView('LIST')} className="p-2 hover:bg-white/5 rounded-lg text-muted-foreground hover:text-foreground">
                                <ArrowLeft size={18} />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-foreground">Open New Ticket</h1>
                                <p className="text-xs text-muted-foreground font-mono uppercase">Submit a support request protocol.</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 bg-card border border-border rounded-lg overflow-hidden flex flex-col">
                            <div className="p-4 border-b border-border bg-muted/20 flex items-center gap-2">
                                <MessageSquare size={16} className="text-primary" />
                                <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Ticket Details</h3>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Subject</label>
                                    <input
                                        value={newSubject}
                                        onChange={(e) => setNewSubject(e.target.value)}
                                        placeholder="Brief summary..."
                                        className="w-full bg-secondary/20 border border-border rounded-lg px-4 py-2.5 text-xs font-mono focus:border-primary/50 focus:outline-none transition-all"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Category</label>
                                        <div className="flex gap-2">
                                            {['TECHNICAL', 'PAYMENT', 'ACCOUNT'].map(c => (
                                                <button
                                                    key={c}
                                                    onClick={() => setNewCategory(c as any)}
                                                    className={clsx(
                                                        "flex-1 py-2 rounded-md border text-[10px] font-bold uppercase transition-all",
                                                        newCategory === c ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-secondary/10 text-muted-foreground hover:bg-secondary/30'
                                                    )}
                                                >
                                                    {c}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Priority</label>
                                        <div className="flex gap-2">
                                            {['Low', 'Medium', 'High'].map(p => (
                                                <button
                                                    key={p}
                                                    onClick={() => setNewPriority(p as any)}
                                                    className={clsx(
                                                        "flex-1 py-2 rounded-md border text-[10px] font-bold uppercase transition-all",
                                                        newPriority === p
                                                            ? (p === 'High' ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-primary bg-primary/10 text-primary')
                                                            : 'border-border bg-secondary/10 text-muted-foreground hover:bg-secondary/30'
                                                    )}
                                                >
                                                    {p}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Description</label>
                                    <textarea
                                        value={newDescription}
                                        onChange={(e) => setNewDescription(e.target.value)}
                                        rows={8}
                                        placeholder="Describe the issue..."
                                        className="w-full bg-secondary/20 border border-border rounded-lg px-4 py-3 text-xs font-mono focus:border-primary/50 focus:outline-none resize-none transition-all"
                                    />
                                </div>
                                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                    <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-[10px] font-bold uppercase tracking-widest">
                                        <Paperclip size={14} /> Attach Files
                                    </button>
                                    <button
                                        onClick={() => {
                                            const newTicket: SupportTicket = {
                                                _id: Date.now().toString(),
                                                ticketId: `TKT-${Math.floor(Date.now() / 1000)}`,
                                                subject: newSubject,
                                                category: newCategory,
                                                priority: newPriority,
                                                status: 'Open',
                                                createdAt: new Date(),
                                                updatedAt: new Date(),
                                                ipAddress: '127.0.0.1',
                                                user: MOCK_USER,
                                                messages: [{ _id: 'm-new', sender: 'USER', message: newDescription, timestamp: new Date() }]
                                            };
                                            setTickets([newTicket, ...tickets]);
                                            setView('LIST');
                                        }}
                                        className="bg-primary text-primary-foreground px-6 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest shadow-lg shadow-primary/20"
                                    >
                                        Submit Ticket
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-lg flex items-start gap-3">
                                <AlertCircle size={18} className="text-blue-500 shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                    <h4 className="text-xs font-bold text-blue-500 uppercase tracking-wide">Before you submit</h4>
                                    <p className="text-[10px] text-muted-foreground leading-relaxed font-mono uppercase">
                                        Please check the FAQ section. Most common issues related to payments are resolved there.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-card border border-border p-6 rounded-lg flex flex-col items-center text-center space-y-4">
                                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                    <MessageSquare size={24} />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-foreground font-mono">24/7</div>
                                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Support Active</div>
                                </div>
                                <p className="text-[10px] text-muted-foreground font-mono uppercase">
                                    Average response time is under 12 hours.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
