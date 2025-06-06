'use client';

import { useEffect, useState } from 'react';

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

export default function Home() {
  const [data, setData] = useState<Patient[]>([]);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Patient Data</h1>
      <ul className="space-y-4">
        {data.map((item) => (
          <li key={item.patient_id} className="border p-4 rounded shadow">
            <div className="flex gap-4 items-center">
              <img src={item.photo_url} alt={item.patient_name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <h2 className="text-lg font-semibold">{item.patient_name}</h2>
                <p>Age: {item.age}</p>
                <p>Issue: {item.medical_issue}</p>
                <p>Contact: {item.contact[0]?.number} | {item.contact[0]?.email}</p>
                <p>Address: {item.contact[0]?.address}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
