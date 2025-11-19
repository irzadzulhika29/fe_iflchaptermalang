import * as React from "react";
import { useGetAllVolunteers } from "../../../features/volunteer";
import Dashboard from "../../../layouts/dashboard";
import Loading from "../../../components/loader";
import { formatDateAndTime } from "../../../utils/formatDate";

const Table = ({ dataVolunteers, questions }) => {
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
              {/* Header dinamis berdasarkan pertanyaan */}
              {questions?.map((question, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {question}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataVolunteers?.map((volunteer, index) => (
              <tr key={index} className="border-b bg-light-1">
                {/* Jawaban dinamis berdasarkan pertanyaan */}
                {questions?.map((question, qIndex) => (
                  <td 
                    key={qIndex} 
                    className="px-6 py-4 whitespace-nowrap"
                  >
                    {volunteer.answers?.[question] || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const VolunteerPage = () => {
  const { data: dataVolunteers, isLoading } = useGetAllVolunteers();

  // Ekstrak pertanyaan unik dari semua volunteer
  const questions = React.useMemo(() => {
    if (!dataVolunteers?.volunteers?.length) return [];
    
    const allKeys = new Set();
    dataVolunteers.volunteers.forEach((volunteer) => {
      if (volunteer.answers) {
        Object.keys(volunteer.answers).forEach((key) => allKeys.add(key));
      }
    });
    
    return Array.from(allKeys);
  }, [dataVolunteers]);

  const detail = (
    <p className="text-sm text-gray-500">
      Last updated at: {formatDateAndTime(dataVolunteers?.latest_update || new Date())}
    </p>
  );

  return (
    <Dashboard title="Volunteer Management" detail={detail}>
      {isLoading ? (
        <Loading height={100} width={100} />
      ) : (
        <Table 
          dataVolunteers={dataVolunteers?.volunteers} 
          questions={questions}
        />
      )}
    </Dashboard>
  );
};

export default VolunteerPage;