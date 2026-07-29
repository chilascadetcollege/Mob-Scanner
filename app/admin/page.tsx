import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  let announcements = 0;
  let approvedTestimonials = 0;
  let pendingTestimonials = 0;
  let unreadContacts = 0;

  try {
    announcements = await prisma.announcement.count();
    approvedTestimonials = await prisma.testimonial.count({ where: { approved: true } });
    pendingTestimonials = await prisma.testimonial.count({ where: { approved: false } });
    unreadContacts = await prisma.contact.count({ where: { status: 'UNREAD' } });
  } catch (error) {
    console.error("Failed to load dashboard stats:", error);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Announcements</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">{announcements}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Approved Testimonials</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">{approvedTestimonials}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Pending Testimonials</h3>
          <p className="mt-2 text-3xl font-bold text-yellow-500">{pendingTestimonials}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Unread Contacts</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">{unreadContacts}</p>
        </div>
      </div>
      
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Welcome to the Administration Panel</h2>
        <p className="text-gray-600">
          This is the Phase 1 foundation of the Nibras Educational System dashboard.
          CRUD functionalities for Announcements, Testimonials, Contacts, and Settings will be built in the next phases.
        </p>
      </div>
    </div>
  );
}
