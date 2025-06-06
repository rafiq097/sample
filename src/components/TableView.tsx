import Patient from '@/types/Patient';

type TableViewProps = {
    paginatedData: Patient[];
};

const getColor = (issue: string) => {
    const colors = {
      'fever': 'bg-red-100 text-red-700',
      'headache': 'bg-orange-100 text-orange-700',
      'sore throat': 'bg-yellow-100 text-yellow-700',
      'sprained ankle': 'bg-green-100 text-green-700',
      'rash': 'bg-pink-100 text-pink-700',
      'ear infection': 'bg-blue-100 text-blue-700',
      'sinusitis': 'bg-gray-100 text-gray-700'
    };
    return colors[issue as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

const TableView = ({ paginatedData }: TableViewProps) => {
    return <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full min-w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider whitespace-nowrap">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider whitespace-nowrap">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider whitespace-nowrap">Age</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider whitespace-nowrap">Medical Issue</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider whitespace-nowrap">Address</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider whitespace-nowrap">Phone Number</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider whitespace-nowrap">Email ID</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {paginatedData.map((patient) => (
                        <tr key={patient.patient_id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm whitespace-nowrap">ID-{patient.patient_id.toString().padStart(4, '0')}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={"/not-found.png"}
                                        alt={patient.patient_name}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <span className="text-sm font-medium">{patient.patient_name}</span>
                                </div>
                            </td>
                            <td className="px-4 py-3 text-sm whitespace-nowrap">{patient.age}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getColor(patient.medical_issue)}`}>
                                    {patient.medical_issue}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                                {!patient.contact[0]?.address ? (
                                    <span className="text-red-500 font-medium">N/A</span>
                                ) : (
                                    patient.contact[0]?.address
                                )}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                                {!patient.contact[0]?.number ? (
                                    <span className="text-red-500 font-medium">N/A</span>
                                ) : (
                                    patient.contact[0]?.number
                                )}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                                {!patient.contact[0]?.email ? (
                                    <span className="text-red-500 font-medium">N/A</span>
                                ) : (
                                    patient.contact[0]?.email
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
};

export default TableView;