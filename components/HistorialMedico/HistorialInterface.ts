export interface FormFieldsProps {
  showForm: boolean;
  date: Date;
  setShowDatePicker: (show: boolean) => void;
  showDatePicker: boolean;
  setDate: (date: Date) => void;
  specialty: string;
  setSpecialty: (specialty: string) => void;
  treatingPhysician: string;
  setTreatingPhysician: (physician: string) => void;
  originalSymptoms: string[];
  setOriginalSymptoms: (index: number, symptom: string) => void;
  diagnoses: string[];
  setDiagnoses: (index: number, diagnosis: string) => void;
  treatments: { treatmentDate: Date; urlDocTreatment: string }[];
  setTreatments: (index: number, field: string, value: any) => void;
  showTreatmentPicker: number | null;
  setShowTreatmentPicker: (index: number | null) => void;
  followUps: { followUpDate: Date; followUpNotes: string }[];
  setFollowUps: (index: number, field: string, value: any) => void;
  showFollowUpPicker: number | null;
  setShowFollowUpPicker: (index: number | null) => void;
  orders: { ordersDate: Date; urlDocOrders: string }[];
  setOrders: (index: number, field: string, value: any) => void;
  showOrderPicker: number | null;
  setShowOrderPicker: (index: number | null) => void;
  handleSubmit: () => void;
}

export interface Treatment {
  treatmentDate: string;
  urlDocTreatment: string;
}

export interface FollowUp {
  followUpDate: string;
  followUpNotes: string;
}

export interface Order {
  ordersDate: string;
  urlDocOrders: string;
}

export interface Historial {
  id: string;
  date: string;
  specialty: string;
  treatingPhysician: string;
  originalSymptoms: string[];
  diagnoses: string[];
  treatments: Treatment[];
  followUps: FollowUp[];
  orders: Order[];
  userDataId: string | null;
}
export interface HistorialEditarComponentProps {
  id: string;
  date: string;
  specialty: string;
  treatingPhysician: string;
  originalSymptoms: string[];
  diagnoses: string[];
  treatments: {
    treatmentDate: (number | string)[];
    urlDocTreatment: string;
  }[];
  followUps: {
    followUpDate: (number | string)[];
    followUpNotes: string;
  }[];
  orders: {
    ordersDate: (number | string)[];
    urlDocOrders: string;
  }[];
  userDataId: string | null;
}

export interface HistorialEditarInterface {
  id: string;
  date: string;
  specialty: string;
  treatingPhysician: string;
  originalSymptoms: string[];
  diagnoses: string[];
  treatments: {
    treatmentDate: string; // ✅ Solo una fecha en formato string
    urlDocTreatment: string;
  }[];
  followUps: {
    followUpDate: string; // ✅ Solo una fecha en formato string
    followUpNotes: string;
  }[];
  orders: {
    ordersDate: string; // ✅ Solo una fecha en formato string
    urlDocOrders: string;
  }[];
  userDataId: string;
}
