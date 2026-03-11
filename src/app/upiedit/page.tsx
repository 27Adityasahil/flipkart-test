"use client";

import React, { useState, useEffect } from 'react';
import { Shield, Key, User, Save, CheckCircle, AlertCircle, LogOut } from 'lucide-react';

export default function UpiEditAdmin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const [upiId, setUpiId] = useState('');
    const [merchantName, setMerchantName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<null | 'success' | 'error'>(null);
    const [saveMessage, setSaveMessage] = useState('');

    // Fetch current config on load (only if authenticated)
    useEffect(() => {
        if (isAuthenticated) {
            fetchConfig();
        }
    }, [isAuthenticated]);

    const fetchConfig = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/payment-config');
            if (response.ok) {
                const data = await response.json();
                setUpiId(data.upiId || '');
                setMerchantName(data.merchantName || '');
            } else {
                console.error('Failed to load configuration');
            }
        } catch (error) {
            console.error('Error fetching config:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === 'sachin234' && password === 'Sachin77upi') {
            setIsAuthenticated(true);
            setLoginError('');
        } else {
            setLoginError('Invalid username or password');
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setSaveStatus(null);
        setSaveMessage('');

        try {
            const response = await fetch('/api/update-upi', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ upiId, merchantName })
            });

            if (response.ok) {
                setSaveStatus('success');
                setSaveMessage('Configuration updated successfully!');
                setTimeout(() => setSaveStatus(null), 3000); // Hide success message after 3 seconds
            } else {
                const errorData = await response.json();
                setSaveStatus('error');
                setSaveMessage(errorData.error || 'Failed to update configuration.');
            }
        } catch (error) {
            console.error('Error saving config:', error);
            setSaveStatus('error');
            setSaveMessage('A network error occurred while saving.');
        } finally {
            setIsSaving(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Shield size={32} />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
                        <p className="text-gray-500 mt-2">Sign in to edit payment configuration</p>
                    </div>

                    {loginError && (
                        <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center">
                            <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                            {loginError}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                                    placeholder="Enter username"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Key size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                                    placeholder="Enter password"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">

                    {/* Header */}
                    <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center text-white">
                            <Shield className="mr-3" size={24} />
                            <h2 className="text-xl font-semibold">Payment Configuration</h2>
                        </div>
                        <button
                            title="Logout"
                            onClick={() => {
                                setIsAuthenticated(false);
                                setUsername('');
                                setPassword('');
                            }}
                            className="text-white hover:bg-blue-700 p-2 rounded-full transition-colors"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>

                    <div className="p-6 sm:p-8">
                        <p className="text-sm text-gray-600 mb-8 border-b pb-4">
                            Update the UPI details used globally on the checkout page. Changes made here are saved to the configuration file and will take effect instantly for all new checkout sessions.
                        </p>

                        {isLoading ? (
                            <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                <span className="ml-3 text-gray-500">Loading configuration...</span>
                            </div>
                        ) : (
                            <form onSubmit={handleSave} className="space-y-6">
                                <div>
                                    <label htmlFor="merchantName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Merchant / Payee Name
                                    </label>
                                    <input
                                        id="merchantName"
                                        type="text"
                                        value={merchantName}
                                        onChange={(e) => setMerchantName(e.target.value)}
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base text-black"
                                        placeholder="e.g., ANIL KUMAR"
                                        required
                                    />
                                    <p className="mt-1.5 text-xs text-gray-500">The business name that appears on the user's UPI app while scanning/paying.</p>
                                </div>

                                <div>
                                    <label htmlFor="upiId" className="block text-sm font-medium text-gray-700 mb-1">
                                        UPI ID (VPA)
                                    </label>
                                    <input
                                        id="upiId"
                                        type="text"
                                        value={upiId}
                                        onChange={(e) => setUpiId(e.target.value)}
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base text-black font-mono"
                                        placeholder="e.g., paytm.s1x1vd6@pty"
                                        required
                                    />
                                    <p className="mt-1.5 text-xs text-gray-500">The UPI Virtual Payment Address where funds will be credited.</p>
                                </div>

                                {/* Status Messages */}
                                {saveStatus === 'success' && (
                                    <div className="rounded-lg bg-green-50 animate-in fade-in p-4 mt-4">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <CheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-green-800">{saveMessage}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {saveStatus === 'error' && (
                                    <div className="rounded-lg bg-red-50 p-4 mt-4">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-red-800">{saveMessage}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-4 border-t border-gray-100 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {isSaving ? (
                                            <>
                                                <div className="animate-spin -ml-1 mr-3 h-4 w-4 text-white border-2 border-white border-t-transparent rounded-full"></div>
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="-ml-1 mr-2 h-5 w-5" />
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
