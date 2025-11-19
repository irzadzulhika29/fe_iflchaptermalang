import * as React from "react";
import { useGetAllVolunteers, useUpdateVolunteerStatus } from "../../../features/volunteer";
import Dashboard from "../../../layouts/dashboard";
import Loading from "../../../components/loader";
import { formatDateAndTime } from "../../../utils/formatDate";
import { FiDownload, FiSearch, FiFilter, FiExternalLink, FiPhone, FiMail, FiUser, FiCalendar, FiInstagram, FiCheckCircle, FiXCircle, FiInfo } from "react-icons/fi";

// Status Cell Component with modern pill design
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
        return 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200';
    }
  };

  return (
    <div className="relative inline-block">
      <select
        value={volunteer.status || 'pending'}
        onChange={handleStatusChange}
        disabled={isUpdating}
        className={`appearance-none pl-3 pr-8 py-1.5 rounded-full text-xs font-semibold border cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary-2/50 disabled:opacity-50 disabled:cursor-not-allowed ${getStatusColor(volunteer.status)}`}
      >
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-current opacity-60">
        <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
      {isUpdating && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-full">
          <div className="w-3 h-3 border-2 border-primary-2 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

const Table = ({ dataVolunteers }) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  // Helper function to format phone number for WhatsApp
  const formatWhatsAppLink = (phone) => {
    if (!phone) return "-";
    const cleanPhone = phone.replace(/\D/g, '');
    const waNumber = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
    return `wa.me/${waNumber}`;
  };

  // Helper for Instagram link
  const formatInstagramLink = (username) => {
    if (!username) return null;
    const cleanUsername = username.replace('@', '').trim();
    return `https://instagram.com/${cleanUsername}`;
  };

  const filteredVolunteers = React.useMemo(() => {
    if (!searchTerm) return dataVolunteers;
    return dataVolunteers.filter(v =>
      v.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.event_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [dataVolunteers, searchTerm]);

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name, email, or event..."
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-2/20 focus:border-primary-2 transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FiFilter />
          <span>{filteredVolunteers?.length || 0} records found</span>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          {!filteredVolunteers?.length ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <FiUser className="w-12 h-12 mb-3 opacity-20" />
              <h3 className="text-lg font-medium">No volunteers found</h3>
              <p className="text-sm">Try adjusting your search terms</p>
            </div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">Volunteer</th>
                  <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">Contact</th>
                  <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">Event Info</th>
                  <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">Source & Exp</th>
                  <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">Compliance</th>
                  <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">Status</th>
                  <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">Details</th>
                  <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredVolunteers.map((volunteer, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors duration-150 group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{volunteer.name || "-"}</span>
                        <div className="flex items-center gap-1">
                          <FiMail className="w-3 h-3" />
                          <span className="text-xs text-gray-500">{volunteer.user?.email || volunteer.email || "-"}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        {volunteer.phone_number ? (
                          <a
                            href={`https://${formatWhatsAppLink(volunteer.phone_number)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-gray-600 hover:text-green-600 transition-colors w-fit"
                          >
                            <FiPhone className="w-3 h-3" />
                            <span className="text-xs">{volunteer.phone_number}</span>
                          </a>
                        ) : "-"}
                        {volunteer.username_instagram && (
                          <a
                            href={formatInstagramLink(volunteer.username_instagram)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-gray-600 hover:text-pink-600 transition-colors w-fit"
                          >
                            <FiInstagram className="w-3 h-3" />
                            <span className="text-xs">{volunteer.username_instagram}</span>
                          </a>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium text-gray-800">{volunteer.event_name || "-"}</span>
                        <span className="text-xs text-gray-500">
                          {volunteer.final_price ? `Rp ${parseInt(volunteer.final_price).toLocaleString('id-ID')}` : "Free"}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5 max-w-[150px]">
                        <div className="flex items-center gap-1 text-xs text-gray-600" title={volunteer.info_source}>
                          <FiInfo className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{volunteer.info_source || "-"}</span>
                        </div>
                        <div className="text-xs text-gray-500 truncate" title={volunteer.experience}>
                          Exp: {volunteer.experience || "-"}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col items-center" title="Read Guidebook">
                          {volunteer.has_read_guidebook ? (
                            <FiCheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <FiXCircle className="w-4 h-4 text-gray-300" />
                          )}
                          <span className="text-[10px] text-gray-400 mt-0.5">Guide</span>
                        </div>
                        <div className="flex flex-col items-center" title="Committed">
                          {volunteer.is_committed ? (
                            <FiCheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <FiXCircle className="w-4 h-4 text-gray-300" />
                          )}
                          <span className="text-[10px] text-gray-400 mt-0.5">Commit</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <StatusCell volunteer={volunteer} />
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <div className="text-xs text-gray-600 max-w-[150px] truncate" title={volunteer.motivation}>
                          <span className="font-medium text-gray-400 mr-1">Mot:</span>
                          {volunteer.motivation || "-"}
                        </div>
                        {volunteer.google_drive_link && (
                          <a
                            href={volunteer.google_drive_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-primary-2 hover:text-primary-1 font-medium w-fit"
                          >
                            <FiExternalLink className="w-3 h-3" />
                            View Proof
                          </a>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-xs">
                      {volunteer.created_at ? formatDateAndTime(volunteer.created_at) : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

const VolunteerPage = () => {
  const { data: response, isLoading } = useGetAllVolunteers();
  const volunteers = response?.data?.data || [];
  const latestUpdate = response?.data?.data?.[0]?.created_at || new Date();

  const downloadCSV = () => {
    if (!volunteers.length) return;
    const headers = [
      'Name',
      'Email',
      'Phone',
      'Instagram',
      'Event',
      'Status',
      'Price',
      'Info Source',
      'Motivation',
      'Experience',
      'Read Guidebook',
      'Committed',
      'Proof Link',
      'Date'
    ];
    const rows = volunteers.map(volunteer => [
      volunteer.name || '',
      volunteer.user?.email || volunteer.email || '',
      volunteer.phone_number || '',
      volunteer.username_instagram || '',
      volunteer.event?.event_name || '',
      volunteer.status || '',
      volunteer.final_price || '',
      volunteer.info_source || '',
      volunteer.motivation || '',
      volunteer.experience || '',
      volunteer.has_read_guidebook ? 'Yes' : 'No',
      volunteer.is_committed ? 'Yes' : 'No',
      volunteer.google_drive_link || '',
      volunteer.created_at ? formatDateAndTime(volunteer.created_at) : ''
    ]);
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `volunteer_registrations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const detail = (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm">
        <FiCalendar className="w-4 h-4" />
        <span>Last updated: {formatDateAndTime(latestUpdate)}</span>
      </div>
      <button
        onClick={downloadCSV}
        disabled={!volunteers.length}
        className="flex items-center gap-2 px-4 py-2 bg-primary-2 text-white rounded-lg hover:bg-primary-1 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md text-sm font-medium"
      >
        <FiDownload className="w-4 h-4" />
        <span>Export CSV</span>
      </button>
    </div>
  );

  return (
    <Dashboard title="Volunteer Management" detail={detail}>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <Loading height={100} width={100} />
        </div>
      ) : (
        <Table dataVolunteers={volunteers} />
      )}
    </Dashboard>
  );
};

export default VolunteerPage;