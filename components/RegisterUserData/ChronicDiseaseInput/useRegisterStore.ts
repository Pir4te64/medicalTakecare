import { create } from "zustand";

interface ChronicDisease {
  disease: string;
  doctorEmail: string;
  medicalCenter: string;
  medicalTreatmentUser: { medication: string; dosage: string }[];
}

interface RegisterState {
  birthDate: Date;
  weight: string;
  height: string;
  bloodType: string;
  medicationAllergies: { allergy: string }[];
  otherAllergies: { allergy: string }[];
  chronicDiseases: ChronicDisease[];
  newDisease: string;
  doctorEmail: string;
  medicalCenter: string;
  medication: string;
  dosage: string;
  setField: (key: keyof Omit<RegisterState, 'setField' | 'resetForm'>, value: any) => void;
  resetForm: () => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  birthDate: new Date(),
  weight: "",
  height: "",
  bloodType: "",
  medicationAllergies: [],
  otherAllergies: [],
  chronicDiseases: [],
  newDisease: "",
  doctorEmail: "",
  medicalCenter: "",
  medication: "",
  dosage: "",
  setField: (key, value) => set((state) => ({ ...state, [key]: value })),
  resetForm: () =>
    set({
      birthDate: new Date(),
      weight: "",
      height: "",
      bloodType: "",
      medicationAllergies: [],
      otherAllergies: [],
      chronicDiseases: [],
      newDisease: "",
      doctorEmail: "",
      medicalCenter: "",
      medication: "",
      dosage: "",
    }),
}));
