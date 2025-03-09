import { create } from "zustand";

interface Treatment {
  treatmentDate: Date;
  urlDocTreatment: string;
}

interface FollowUp {
  followUpDate: Date;
  followUpNotes: string;
}

interface Order {
  ordersDate: Date;
  urlDocOrders: string;
}

interface HistorialMedicoState {
  // Datos del formulario
  date: Date;
  specialty: string;
  treatingPhysician: string;
  originalSymptoms: string[];
  diagnoses: string[];
  treatments: Treatment[];
  followUps: FollowUp[];
  orders: Order[];

  // Estados para DateTimePickers
  showDatePicker: boolean;
  showTreatmentPicker: number | null;
  showFollowUpPicker: number | null;
  showOrderPicker: number | null;

  // Funciones para modificar los datos
  setDate: (value: Date) => void;
  setSpecialty: (value: string) => void;
  setTreatingPhysician: (value: string) => void;
  setOriginalSymptoms: (index: number, value: string) => void;
  setDiagnoses: (index: number, value: string) => void;
  setTreatments: (
    index: number,
    field: keyof Treatment,
    value: Date | string
  ) => void;
  setFollowUps: (
    index: number,
    field: keyof FollowUp,
    value: Date | string
  ) => void;
  setOrders: (index: number, field: keyof Order, value: Date | string) => void;

  // Funciones para modificar el array de originalSymptoms
  addOriginalSymptom: (symptom: string) => void;
  removeOriginalSymptom: (index: number) => void;
  setOriginalSymptomsArray: (symptoms: string[]) => void;

  // Funciones para diagnosticos
  addDiagnosis: (diagnosis: string) => void;
  removeDiagnosis: (index: number) => void;
  setDiagnosesArray: (diagnoses: string[]) => void;

  // Funciones para treatments
  addTreatment: (treatment: Treatment) => void;
  removeTreatment: (index: number) => void;
  setTreatmentsArray: (treatments: Treatment[]) => void;

  // Funciones para followUps
  addFollowUp: (followUp: FollowUp) => void;
  removeFollowUp: (index: number) => void;
  setFollowUpsArray: (followUps: FollowUp[]) => void;

  // Funciones para orders
  addOrder: (order: Order) => void;
  removeOrder: (index: number) => void;
  setOrdersArray: (orders: Order[]) => void;

  // Funciones para controlar los DateTimePickers
  setShowDatePicker: (value: boolean) => void;
  setShowTreatmentPicker: (index: number | null) => void;
  setShowFollowUpPicker: (index: number | null) => void;
  setShowOrderPicker: (index: number | null) => void;
  resetForm: () => void;
}

export const useHistorialMedicoStore = create<HistorialMedicoState>((set) => ({
  // Datos del formulario
  date: new Date(),
  specialty: "",
  treatingPhysician: "",
  originalSymptoms: [""],
  diagnoses: [""],
  treatments: [{ treatmentDate: new Date(), urlDocTreatment: "" }],
  followUps: [{ followUpDate: new Date(), followUpNotes: "" }],
  orders: [{ ordersDate: new Date(), urlDocOrders: "" }],

  // Estados para DateTimePickers
  showDatePicker: false,
  showTreatmentPicker: null,
  showFollowUpPicker: null,
  showOrderPicker: null,

  // Funciones para modificar datos
  setDate: (value) => set({ date: value }),
  setSpecialty: (value) => set({ specialty: value }),
  setTreatingPhysician: (value) => set({ treatingPhysician: value }),

  setOriginalSymptoms: (index, value) =>
    set((state) => {
      const updated = [...state.originalSymptoms];
      updated[index] = value;
      return { originalSymptoms: updated };
    }),

  setDiagnoses: (index, value) =>
    set((state) => {
      const updated = [...state.diagnoses];
      updated[index] = value;
      return { diagnoses: updated };
    }),

  setTreatments: (index, field, value) =>
    set((state) => {
      const updated = [...state.treatments];
      updated[index] = { ...updated[index], [field]: value };
      return { treatments: updated };
    }),

  setFollowUps: (index, field, value) =>
    set((state) => {
      const updated = [...state.followUps];
      updated[index] = { ...updated[index], [field]: value };
      return { followUps: updated };
    }),

  setOrders: (index, field, value) =>
    set((state) => {
      const updated = [...state.orders];
      updated[index] = { ...updated[index], [field]: value };
      return { orders: updated };
    }),

  // Funciones para modificar el array de originalSymptoms
  addOriginalSymptom: (symptom: string) =>
    set((state) => ({
      originalSymptoms: [...state.originalSymptoms, symptom],
    })),

  removeOriginalSymptom: (index: number) =>
    set((state) => ({
      originalSymptoms: state.originalSymptoms.filter((_, i) => i !== index),
    })),

  setOriginalSymptomsArray: (symptoms: string[]) =>
    set({ originalSymptoms: symptoms }),

  // Funciones para diagnosticos
  addDiagnosis: (diagnosis: string) =>
    set((state) => ({
      diagnoses: [...state.diagnoses, diagnosis],
    })),

  removeDiagnosis: (index: number) =>
    set((state) => ({
      diagnoses: state.diagnoses.filter((_, i) => i !== index),
    })),

  setDiagnosesArray: (diagnoses: string[]) => set({ diagnoses }),

  // Funciones para treatments
  addTreatment: (treatment: Treatment) =>
    set((state) => ({
      treatments: [...state.treatments, treatment],
    })),

  removeTreatment: (index: number) =>
    set((state) => ({
      treatments: state.treatments.filter((_, i) => i !== index),
    })),

  setTreatmentsArray: (treatments: Treatment[]) => set({ treatments }),

  // Funciones para followUps
  addFollowUp: (followUp: FollowUp) =>
    set((state) => ({
      followUps: [...state.followUps, followUp],
    })),

  removeFollowUp: (index: number) =>
    set((state) => ({
      followUps: state.followUps.filter((_, i) => i !== index),
    })),

  setFollowUpsArray: (followUps: FollowUp[]) => set({ followUps }),

  // Funciones para orders
  addOrder: (order: Order) =>
    set((state) => ({
      orders: [...state.orders, order],
    })),

  removeOrder: (index: number) =>
    set((state) => ({
      orders: state.orders.filter((_, i) => i !== index),
    })),

  setOrdersArray: (orders: Order[]) => set({ orders }),
  resetForm: () =>
    set({
      date: new Date(),
      specialty: "",
      treatingPhysician: "",
      originalSymptoms: [""],
      diagnoses: [""],
      treatments: [{ treatmentDate: new Date(), urlDocTreatment: "" }],
      followUps: [{ followUpDate: new Date(), followUpNotes: "" }],
      orders: [{ ordersDate: new Date(), urlDocOrders: "" }],
    }),
  // Funciones para controlar los DateTimePickers
  setShowDatePicker: (value) => set({ showDatePicker: value }),
  setShowTreatmentPicker: (index) => set({ showTreatmentPicker: index }),
  setShowFollowUpPicker: (index) => set({ showFollowUpPicker: index }),
  setShowOrderPicker: (index) => set({ showOrderPicker: index }),
}));
