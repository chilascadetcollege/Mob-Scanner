"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { LayoutDashboard, LogOut, Settings, MessageSquare, Megaphone, Users, Mail } from "lucide-react";

export default function AdminSidebar({ user }: { user: any }) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        <p className="text-sm text-gray-500 mt-1">{user?.name}</p>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          <Link href="/admin" className="flex items-center px-3 py-2 text-gray-700 rounded-md bg-gray-100 font-medium">
            <LayoutDashboard className="mr-3 h-5 w-5 text-gray-500" />
            Dashboard
          </Link>
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4 mb-1">
            Content
          </div>
          <Link href="/admin#" className="flex items-center px-3 py-2 text-gray-600 rounded-md hover:bg-gray-50 font-medium">
            <Megaphone className="mr-3 h-5 w-5 text-gray-400" />
            Announcements
          </Link>
          <Link href="/admin#" className="flex items-center px-3 py-2 text-gray-600 rounded-md hover:bg-gray-50 font-medium">
            <MessageSquare className="mr-3 h-5 w-5 text-gray-400" />
            Principal Message
          </Link>
          <Link href="/admin#" className="flex items-center px-3 py-2 text-gray-600 rounded-md hover:bg-gray-50 font-medium">
            <Users className="mr-3 h-5 w-5 text-gray-400" />
            Testimonials
          </Link>
          <Link href="/admin#" className="flex items-center px-3 py-2 text-gray-600 rounded-md hover:bg-gray-50 font-medium">
            <Mail className="mr-3 h-5 w-5 text-gray-400" />
            Contacts
          </Link>
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4 mb-1">
            System
          </div>
          <Link href="/admin#" className="flex items-center px-3 py-2 text-gray-600 rounded-md hover:bg-gray-50 font-medium">
            <Settings className="mr-3 h-5 w-5 text-gray-400" />
            Settings
          </Link>
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => signOut()}
          className="flex items-center w-full px-3 py-2 text-gray-600 rounded-md hover:bg-gray-50 font-medium transition"
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-400" />
          Log out
        </button>
      </div>
    </div>
  );
}
