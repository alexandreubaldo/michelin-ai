export type Certification = {
  id: string;
  tireModelId: string;
  tireModelName: string;
  description: string;
  dueDate: Date;
  status: 'pending' | 'completed' | 'overdue' | 'at-risk';
  assignedTo: string;
  priority: 'low' | 'medium' | 'high';
  type: 'homologation' | 'warranty' | 'testing' | 'compliance' | 'renewal' | 'other';
  tasks: Task[];
  region: string;
  certificationBody: string;
  standards: string[];
};

export type Task = {
  id: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  assignedTo: string;
};

export type TireModel = {
  id: string;
  name: string;
  manufacturer: string;
  launchDate: Date;
  endOfLifeDate: Date;
  value: number;
  status: 'active' | 'deprecated' | 'discontinued' | 'pending';
  owner: string;
  certificationCount: number;
  documentUrl: string;
  specifications: {
    size: string;
    type: string;
    loadIndex: string;
    speedRating: string;
    season: 'summer' | 'winter' | 'all-season';
  };
};

export type User = {
  id: string;
  name: string;
  email: string;
  department: string;
  avatar: string;
};

export const users: User[] = [
  {
    id: "user-001",
    name: "Alice Johnson",
    email: "alice@example.com",
    department: "Legal",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "user-002",
    name: "Bob Smith",
    email: "bob@example.com",
    department: "Finance",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "user-003",
    name: "Carol Taylor",
    email: "carol@example.com",
    department: "Procurement",
    avatar: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "user-004",
    name: "David Wilson",
    email: "david@example.com",
    department: "Operations",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "user-005",
    name: "Emma Chen",
    email: "emma@example.com",
    department: "IT Operations",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "user-006",
    name: "Frank Martinez",
    email: "frank@example.com",
    department: "Security",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "user-007",
    name: "Grace Lee",
    email: "grace@example.com",
    department: "Legal",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "user-008",
    name: "Henry Brown",
    email: "henry@example.com",
    department: "Customer Success",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  }
];

export const tireModels: TireModel[] = [
  {
    id: "tire-001",
    name: "Pilot Sport 5",
    manufacturer: "Michelin",
    launchDate: new Date(2025, 2, 15),
    endOfLifeDate: new Date(2029, 2, 14),
    value: 250000,
    status: "active",
    owner: "user-001",
    certificationCount: 8,
    documentUrl: "#",
    specifications: {
      size: "225/45R17",
      type: "Performance",
      loadIndex: "91Y",
      speedRating: "Y",
      season: "summer"
    }
  },
  {
    id: "tire-002",
    name: "CrossClimate 2",
    manufacturer: "Michelin",
    launchDate: new Date(2023, 8, 1),
    endOfLifeDate: new Date(2028, 7, 31),
    value: 320000,
    status: "active",
    owner: "user-003",
    certificationCount: 12,
    documentUrl: "#",
    specifications: {
      size: "205/55R16",
      type: "All-Season",
      loadIndex: "91H",
      speedRating: "H",
      season: "all-season"
    }
  },
  {
    id: "tire-003",
    name: "Alpin 6",
    manufacturer: "Michelin",
    launchDate: new Date(2025, 0, 1),
    endOfLifeDate: new Date(2029, 11, 31),
    value: 180000,
    status: "active",
    owner: "user-004",
    certificationCount: 6,
    documentUrl: "#",
    specifications: {
      size: "215/55R17",
      type: "Winter",
      loadIndex: "98V",
      speedRating: "V",
      season: "winter"
    }
  }
];

export const certifications: Certification[] = [
  {
    id: "cert-001",
    tireModelId: "tire-001",
    tireModelName: "Pilot Sport 5",
    description: "EU Type Approval Certification",
    dueDate: new Date(2025, 5, 15),
    status: "pending",
    assignedTo: "user-002",
    priority: "high",
    type: "homologation",
    region: "European Union",
    certificationBody: "TÜV SÜD",
    standards: ["ECE R30", "ECE R54"],
    tasks: [
      {
        id: "task-001-1",
        description: "Submit technical documentation",
        dueDate: new Date(2025, 5, 10),
        completed: true,
        assignedTo: "user-002"
      },
      {
        id: "task-001-2",
        description: "Schedule wet grip testing",
        dueDate: new Date(2025, 5, 12),
        completed: false,
        assignedTo: "user-002"
      },
      {
        id: "task-001-3",
        description: "Complete noise testing",
        dueDate: new Date(2025, 5, 14),
        completed: false,
        assignedTo: "user-002"
      }
    ]
  },
  {
    id: "cert-002",
    tireModelId: "tire-001",
    tireModelName: "Pilot Sport 5",
    description: "US DOT Certification",
    dueDate: new Date(2025, 5, 5),
    status: "pending",
    assignedTo: "user-004",
    priority: "medium",
    type: "compliance",
    region: "United States",
    certificationBody: "NHTSA",
    standards: ["FMVSS 109", "FMVSS 119"],
    tasks: [
      {
        id: "task-002-1",
        description: "Prepare DOT marking documentation",
        dueDate: new Date(2025, 5, 1),
        completed: true,
        assignedTo: "user-004"
      },
      {
        id: "task-002-2",
        description: "Complete endurance testing",
        dueDate: new Date(2025, 5, 3),
        completed: false,
        assignedTo: "user-004"
      },
      {
        id: "task-002-3",
        description: "Submit certification application",
        dueDate: new Date(2025, 5, 4),
        completed: false,
        assignedTo: "user-004"
      }
    ]
  },
  {
    id: "cert-003",
    tireModelId: "tire-002",
    tireModelName: "CrossClimate 2",
    description: "China CCC Certification",
    dueDate: new Date(2025, 5, 1),
    status: "pending",
    assignedTo: "user-002",
    priority: "high",
    type: "homologation",
    region: "China",
    certificationBody: "CQC",
    standards: ["GB 9743", "GB 9744"],
    tasks: [
      {
        id: "task-003-1",
        description: "Prepare Chinese technical documentation",
        dueDate: new Date(2025, 4, 28),
        completed: true,
        assignedTo: "user-002"
      },
      {
        id: "task-003-2",
        description: "Schedule local testing",
        dueDate: new Date(2025, 4, 30),
        completed: false,
        assignedTo: "user-002"
      }
    ]
  }
];

export const getCertificationsByStatus = () => {
  const pending = certifications.filter(cert => cert.status === 'pending').length;
  const completed = certifications.filter(cert => cert.status === 'completed').length;
  const overdue = certifications.filter(cert => cert.status === 'overdue').length;
  const atRisk = certifications.filter(cert => cert.status === 'at-risk').length;
  
  return {
    pending,
    completed,
    overdue,
    atRisk
  };
};

export const getCertificationsByType = () => {
  const homologation = certifications.filter(cert => cert.type === 'homologation').length;
  const warranty = certifications.filter(cert => cert.type === 'warranty').length;
  const testing = certifications.filter(cert => cert.type === 'testing').length;
  const compliance = certifications.filter(cert => cert.type === 'compliance').length;
  const renewal = certifications.filter(cert => cert.type === 'renewal').length;
  const other = certifications.filter(cert => cert.type === 'other').length;
  
  return {
    homologation,
    warranty,
    testing,
    compliance,
    renewal,
    other
  };
};

export const getAssignedCertifications = (userId: string) => {
  return certifications.filter(cert => cert.assignedTo === userId);
};

export const getUpcomingDeadlines = (days: number = 30) => {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + days);
  
  return certifications
    .filter(cert => 
      cert.status !== 'completed' && 
      cert.dueDate >= today && 
      cert.dueDate <= futureDate
    )
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export const getDaysLeft = (date: Date): number => {
  const today = new Date();
  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
