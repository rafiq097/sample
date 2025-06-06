import Patient from "@/types/Patient";

type CardViewProps = {
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

const CardView = ({ paginatedData }: CardViewProps) => {
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {paginatedData.map((patient) => (
            <div key={patient.patient_id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                    <img
                        src={"/not-found.png"}
                        alt={patient.patient_name}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                        <h3 className="font-medium text-sm">{patient.patient_name}</h3>
                        <p className="text-xs text-gray-500">ID-{patient.patient_id.toString().padStart(4, '0')}</p>
                    </div>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-medium">
                        Age {patient.age}
                    </button>
                </div>

                <div className="mb-3">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getColor(patient.medical_issue)}`}>
                        {patient.medical_issue}
                    </span>
                </div>

                <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                        <span>📍</span>
                        <span>{patient.contact[0]?.address || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>📞</span>
                        <span>{patient.contact[0]?.number || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>✉️</span>
                        <span className="truncate">{patient.contact[0]?.email || 'N/A'}</span>
                    </div>
                </div>
            </div>
        ))}
    </div>
};

export default CardView;