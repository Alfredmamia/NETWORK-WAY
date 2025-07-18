export interface NetworkElement {
  id: string;
  type: 'cable' | 'junction_box' | 'dslam' | 'client_point' | 'pole' | 'conduit';
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  status: 'active' | 'inactive' | 'maintenance' | 'fault';
  properties: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Cable extends NetworkElement {
  type: 'cable';
  properties: {
    length: number;
    fiberCount: number;
    cableType: string;
    installationDate: Date;
    capacity: number;
    usedCapacity: number;
  };
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  contractType: 'residential' | 'business' | 'enterprise';
  status: 'active' | 'suspended' | 'pending';
  bandwidth: number;
  installationDate: Date;
  region: string;
  commune: string;
}

export interface MaintenanceTicket {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  assignedTo: string;
  location: {
    lat: number;
    lng: number;
  };
  affectedElements: string[];
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
}

export interface Report {
  id: string;
  type: 'performance' | 'regulatory' | 'maintenance' | 'financial';
  title: string;
  generatedAt: Date;
  period: {
    start: Date;
    end: Date;
  };
  data: Record<string, any>;
}

export interface PlanningProject {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'approved' | 'in_progress' | 'completed';
  budget: number;
  estimatedCost: number;
  startDate: Date;
  endDate: Date;
  coverage: {
    region: string;
    communes: string[];
    estimatedClients: number;
  };
  materials: Array<{
    type: string;
    quantity: number;
    unitCost: number;
  }>;
}