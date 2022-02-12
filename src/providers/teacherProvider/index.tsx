import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import api from "../../services/api";

interface TeacherProps {
  children: ReactNode;
}

interface TeacherProviderData {
  teachers: Teacher[];
  addTeacher: (teacher: Teacher) => void;
  getAllTeachers: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  teacherId: string;
}

interface Teacher {
  id: string;
  user: User[];
  name: string;
  email: string;
  isAdm: boolean;
}

const TeacherContext = createContext<TeacherProviderData>(
  {} as TeacherProviderData
);

export const TeacherProvider = ({ children }: TeacherProps) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const getAllTeachers = useCallback(() => {
    const token = localStorage.getItem("@askDemo:token") || "";

    api
      .get("/teachers", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDQ2MzcwMDUsImV4cCI6MTY0NDcyMzQwNSwic3ViIjoiYTMzMmI0ZDUtNTk2NC00MjBlLThiMGEtZWM2NTBmMGE0OGUxIn0.aY8QH6_MkWqJ0cK1XiKvGGUsZd1YmjVv6fd0QJ_rLI4`,
        },
      })
      .then((res) => {
        setTeachers(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    getAllTeachers();
  }, [getAllTeachers]);

  console.log(teachers);

  const addTeacher = (teacher: Teacher) => {
    setTeachers([...teachers, teacher]);
  };

  return (
    <TeacherContext.Provider value={{ teachers, addTeacher, getAllTeachers }}>
      {children}
    </TeacherContext.Provider>
  );
};

export const useTeacher = () => useContext(TeacherContext);
