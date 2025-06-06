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

export default Patient;