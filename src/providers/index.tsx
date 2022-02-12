import { ReactNode } from "react";
import { TeacherProvider } from "./teacherProvider";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return <TeacherProvider>{children}</TeacherProvider>;
};

export default Providers;
