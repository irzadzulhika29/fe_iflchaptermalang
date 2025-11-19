import * as React from "react";
import { useGetAllVolunteers, useUpdateVolunteerStatus } from "../../../features/volunteer";
import Dashboard from "../../../layouts/dashboard";
import Loading from "../../../components/loader";
import { formatDateAndTime } from "../../../utils/formatDate";

// Status Cell Component with dropdown
const StatusCell = ({ volunteer }) => {
  const [isUpdating, setIsUpdating] = React.useState(false);
  const updateStatus = useUpdateVolunteerStatus();

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    if (newStatus === volunteer.status) return;

    setIsUpdating(true);
    try {
      await updateStatus.mutateAsync({
        id: volunteer.id,
        status: newStatus
      });
      console.log('Status updated successfully');
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="relative">
      <select
        value={volunteer.status || 'pending'}
        onChange={handleStatusChange}
        disabled={isUpdating}
        className={`px-3 py-1 rounded-full text-xs font-semibold border cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${getStatusColor(volunteer.status)}`}
      >
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
      {isUpdating && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

const Table = ({ dataVolunteers }) => {
  // Helper function to format phone number for WhatsApp
  const formatWhatsAppLink = (phone) => {
    if (!phone) return "-";
    // Remove any non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    // Replace leading 0 with 62 (Indonesia country code)
    const waNumber = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
    return `wa.me/${waNumber}`;
  };

  return (
    <div className="relative mt-4 overflow-x-auto border rounded">
      {!dataVolunteers?.length ? (
        <h1 className="m-8 text-3xl font-semibold text-center text-gray-400">
          Belum ada volunteer yang terdaftar
        </h1>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-dark-1">
          <thead className="uppercase text-dark-1 bg-light-2">
            <tr className="text-base uppercase">
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Phone</th>
              <th scope="col" className="px-6 py-3">Event</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Info Source</th>
              <th scope="col" className="px-6 py-3">Motivation</th>
              <th scope="col" className="px-6 py-3">Experience</th>
              <th scope="col" className="px-6 py-3">Proof Link</th>
              <th scope="col" className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {dataVolunteers?.map((volunteer, index) => (
              <tr key={index} className="border-b bg-light-1">
                <td className="px-6 py-4 whitespace-nowrap font-medium">
                  {volunteer.name || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {volunteer.user?.email || volunteer.email || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {volunteer.phone_number ? (
                    <a
                      href={`https://${formatWhatsAppLink(volunteer.phone_number)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {formatWhatsAppLink(volunteer.phone_number)}
                    </a>
                  ) : "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {volunteer.event?.event_name || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusCell volunteer={volunteer} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {volunteer.final_price ? `Rp ${parseInt(volunteer.final_price).toLocaleString('id-ID')}` : "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {volunteer.info_source || "-"}
                </td>
                <td className="px-6 py-4 max-w-xs truncate" title={volunteer.motivation}>
                  {volunteer.motivation || "-"}
                </td>
                <td className="px-6 py-4 max-w-xs truncate" title={volunteer.experience}>
                  {volunteer.experience || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {volunteer.google_drive_link ? (
                    <a
                      href={volunteer.google_drive_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      View
                    </a>
                  ) : "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {volunteer.created_at ? formatDateAndTime(volunteer.created_at) : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const VolunteerPage = () => {
  const { data: response, isLoading } = useGetAllVolunteers();

  // Access the nested data structure: response.data.data based on the user's image
  const volunteers = response?.data?.data || [];
  const latestUpdate = response?.data?.data?.[0]?.created_at || new Date();

  // CSV Download function
  const downloadCSV = () => {
    if (!volunteers.length) return;

    // Define CSV headers
    const headers = [
      'Name',
      'Email',
      'Phone',
      'Event',
      'Status',
      'Price',
      'Info Source',
      'Motivation',
      'Experience',
      'Proof Link',
      'Date'
    ];

    // Convert data to CSV rows
    const rows = volunteers.map(volunteer => [
      volunteer.name || '',
      volunteer.user?.email || volunteer.email || '',
      volunteer.phone_number || '',
      volunteer.event?.event_name || '',
      volunteer.status || '',
      volunteer.final_price || '',
      volunteer.info_source || '',
      volunteer.motivation || '',
      volunteer.experience || '',
      volunteer.google_drive_link || '',
      volunteer.created_at ? formatDateAndTime(volunteer.created_at) : ''
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `volunteer_registrations_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const detail = (
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500">
        Last updated at: {formatDateAndTime(latestUpdate)}
      </p>
      <button
        onClick={downloadCSV}
        disabled={!volunteers.length}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        Download CSV
      </button>
    </div>
  );

  return (
    <Dashboard title="Volunteer Management" detail={detail}>
      {isLoading ? (
        <Loading height={100} width={100} />
      ) : (
        <Table dataVolunteers={volunteers} />
      )}
    </Dashboard>
  );
};

export default VolunteerPage;