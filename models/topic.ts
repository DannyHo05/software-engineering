import { type } from "os";

export type TopicType = {
  id: number;
  topic_id: string;
  description: string;
  status: number;
  end_day?:Date;
  start_day?:Date;
  departments: {
    id: number;
    department_id: string;
    name: string;
    head_id: string;
  };
  instructors: {
    id: number;
    instructor_id: string;
    name: string;
    birthday: string;
    departments: {
      id: number;
      department_id: string;
      name: string;
      head_id: string;
    };
    user: {
      id: number;
    };
  };
};

export type topicResPayload = {
  id?:number
  description: string;
  departments: {
    id: number;
  };
  instructors: {
    id: number;
  };
  start_day:Date;
  end_day : Date;
  status:number;
}
