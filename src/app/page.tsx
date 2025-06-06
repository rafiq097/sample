'use client';

import { useEffect, useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';

type Contact = {
  address: string;
  number: string;
  email: string;
};

type Patient = {
  patient_id: number;
  patient_name: string;
  age: number;
  photo_url: string;
  contact: Contact[];
  medical_issue: string;
};

export default function PatientDirectory() {
  const [data, setData] = useState<Patient[]>([]);
  const [filtered, setFiltered] = useState<Patient[]>([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('table');
  const [issues, setIssues] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((resData: Patient[]) => {
        setData(resData);
        setFiltered(resData);
        setIssues(Array.from(new Set(resData.map(p => p.medical_issue))));
      })
      .catch(console.error);
  }, [])

  useEffect(() => {
    let result = [...data];

    if (search) {
      result = result.filter((p) =>
        p.patient_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (activeFilters.length > 0) {
      result = result.filter((p) =>
        activeFilters.includes(p.medical_issue)
      );
    }

    if (sortOrder === 'asc') {
      result.sort((a, b) => a.age - b.age);
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => b.age - a.age);
    }

    setFiltered(result);
  }, [search, sortOrder, activeFilters, data]);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const getColor = (issue: string) => {
    const colors = {
      'Fever': 'bg-red-100 text-red-700',
      'Headache': 'bg-orange-100 text-orange-700', 
      'Sore throat': 'bg-yellow-100 text-yellow-700',
      'Sprained ankle': 'bg-green-100 text-green-700',
      'Rash': 'bg-pink-100 text-pink-700',
      'Ear infection': 'bg-blue-100 text-blue-700',
      'Sinusitis': 'bg-gray-100 text-gray-700'
    };
    return colors[issue as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const CardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {filtered.map((patient) => (
        <div key={patient.patient_id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={patient.photo_url}
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
              <span>{patient.contact[0]?.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📞</span>
              <span>{patient.contact[0]?.number}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✉️</span>
              <span className="truncate">{patient.contact[0]?.email}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const TableView = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">ID</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Age</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Medical Issue</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Address</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Phone Number</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Email ID</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filtered.map((patient) => (
            <tr key={patient.patient_id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm">ID-{patient.patient_id.toString().padStart(4, '0')}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={patient.photo_url}
                    alt={patient.patient_name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium">{patient.patient_name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-sm">{patient.age}</td>
              <td className="px-4 py-3">
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getColor(patient.medical_issue)}`}>
                  {patient.medical_issue}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">{patient.contact[0]?.address}</td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {!patient.contact[0]?.number ? (
                  <span className="text-red-500 font-medium">N/A</span>
                ) : (
                  patient.contact[0]?.number
                )}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
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
  );

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r bg-blue-500 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Patient Directory</h1>
          <p className="text-purple-100 mt-1">{filtered.length} Patient Found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === 'table' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Table View
              </button>
              <button
                onClick={() => setViewMode('card')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === 'card' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Card View
              </button>
            </div>

            <div className="flex flex-1 gap-4 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc' | '')}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Sort by:</option>
                  <option value="asc">Age Ascending</option>
                  <option value="desc">Age Descending</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Active Filters: {activeFilters.length}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {issues.map((issue) => (
              <button
                key={issue}
                onClick={() => toggleFilter(issue)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  activeFilters.includes(issue)
                    ? 'bg-blue-100 text-blue-700 border-blue-200'
                    : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                }`}
              >
                {issue} ✕
              </button>
            ))}
          </div>
        </div>

        {viewMode === 'card' ? <CardView /> : <TableView />}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No patients found.</p>
          </div>
        )}
      </div>
    </div>
  );
}