import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Plus,
  Search,
  Filter,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  User,
  MapPin,
  Calendar,
  Wrench,
  Edit,
  Eye,
} from 'lucide-react';

const Maintenance: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  const ticketStats = [
    { name: 'Tickets Ouverts', value: '23', icon: AlertTriangle, color: 'bg-red-500' },
    { name: 'En Cours', value: '15', icon: Clock, color: 'bg-yellow-500' },
    { name: 'Résolus', value: '187', icon: CheckCircle, color: 'bg-green-500' },
    { name: 'Fermés', value: '1,234', icon: XCircle, color: 'bg-gray-500' },
  ];

  const tickets = [
    {
      id: 'TK-2023-001',
      title: 'Panne fibre optique - Secteur Bonanjo',
      description: 'Interruption complète du service dans le quartier Bonanjo suite à une coupure de câble',
      priority: 'critical',
      status: 'in_progress',
      assignedTo: 'Équipe Technique A',
      location: { lat: 4.0611, lng: 9.7579 },
      address: 'Quartier Bonanjo, Douala',
      affectedElements: ['cable-001', 'dslam-003'],
      affectedClients: 234,
      createdAt: '2023-06-15T08:30:00Z',
      updatedAt: '2023-06-15T14:20:00Z',
      estimatedResolution: '2023-06-16T10:00:00Z',
    },
    {
      id: 'TK-2023-002',
      title: 'Maintenance préventive DSLAM Yaoundé',
      description: 'Maintenance programmée du DSLAM principal de Yaoundé Centre',
      priority: 'medium',
      status: 'open',
      assignedTo: 'Jean Mballa',
      location: { lat: 3.8480, lng: 11.5021 },
      address: 'Avenue Kennedy, Yaoundé',
      affectedElements: ['dslam-007'],
      affectedClients: 89,
      createdAt: '2023-06-14T16:45:00Z',
      updatedAt: '2023-06-14T16:45:00Z',
      estimatedResolution: '2023-06-17T12:00:00Z',
    },
    {
      id: 'TK-2023-003',
      title: 'Problème de connectivité client',
      description: 'Client signale des déconnexions fréquentes',
      priority: 'low',
      status: 'resolved',
      assignedTo: 'Marie Fotso',
      location: { lat: 4.0311, lng: 9.7779 },
      address: 'Quartier Makepe, Douala',
      affectedElements: ['client-point-045'],
      affectedClients: 1,
      createdAt: '2023-06-13T09:15:00Z',
      updatedAt: '2023-06-14T11:30:00Z',
      resolvedAt: '2023-06-14T11:30:00Z',
    },
    {
      id: 'TK-2023-004',
      title: 'Remplacement équipement défaillant',
      description: 'Boîtier de jonction endommagé par les intempéries',
      priority: 'high',
      status: 'in_progress',
      assignedTo: 'Équipe Technique B',
      location: { lat: 3.8667, lng: 11.5167 },
      address: 'Quartier Tsinga, Yaoundé',
      affectedElements: ['junction-box-012'],
      affectedClients: 45,
      createdAt: '2023-06-12T14:20:00Z',
      updatedAt: '2023-06-15T09:45:00Z',
      estimatedResolution: '2023-06-16T16:00:00Z',
    },
    {
      id: 'TK-2023-005',
      title: 'Extension réseau - Nouveau quartier',
      description: 'Installation de nouveaux équipements pour extension réseau',
      priority: 'medium',
      status: 'closed',
      assignedTo: 'Paul Nkomo',
      location: { lat: 3.8333, lng: 11.5000 },
      address: 'Quartier Mendong, Yaoundé',
      affectedElements: ['cable-015', 'pole-089'],
      affectedClients: 0,
      createdAt: '2023-06-10T10:00:00Z',
      updatedAt: '2023-06-12T17:30:00Z',
      resolvedAt: '2023-06-12T17:30:00Z',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return AlertTriangle;
      case 'in_progress':
        return Clock;
      case 'resolved':
        return CheckCircle;
      case 'closed':
        return XCircle;
      default:
        return AlertTriangle;
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || ticket.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || ticket.priority === selectedPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const calculateDuration = (start: string, end?: string) => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();
    const diffHours = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return `${diffHours}h`;
    } else {
      const days = Math.floor(diffHours / 24);
      const hours = diffHours % 24;
      return `${days}j ${hours}h`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('maintenance.title')}</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestion des tickets de maintenance et suivi des interventions
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            {t('maintenance.addTicket')}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {ticketStats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 ${stat.color} rounded-md flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Rechercher un ticket..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="open">Ouvert</option>
              <option value="in_progress">En cours</option>
              <option value="resolved">Résolu</option>
              <option value="closed">Fermé</option>
            </select>
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              <option value="all">Toutes les priorités</option>
              <option value="critical">Critique</option>
              <option value="high">Élevée</option>
              <option value="medium">Moyenne</option>
              <option value="low">Faible</option>
            </select>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filtres avancés
          </button>
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredTickets.map((ticket) => {
            const StatusIcon = getStatusIcon(ticket.status);
            return (
              <li key={ticket.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <StatusIcon className="w-6 h-6 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-900">{ticket.title}</p>
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                            {ticket.status}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">{ticket.description}</p>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <User className="flex-shrink-0 mr-1.5 h-4 w-4" />
                          {ticket.assignedTo}
                          <span className="mx-2">•</span>
                          <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4" />
                          {ticket.address}
                          <span className="mx-2">•</span>
                          <span className="font-medium">{ticket.affectedClients} clients affectés</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">#{ticket.id}</p>
                        <p className="text-sm text-gray-500">
                          Durée: {calculateDuration(ticket.createdAt, ticket.resolvedAt)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Créé:</span>
                        <span className="ml-1 text-gray-900">{formatDate(ticket.createdAt)}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Mis à jour:</span>
                        <span className="ml-1 text-gray-900">{formatDate(ticket.updatedAt)}</span>
                      </div>
                      {ticket.estimatedResolution && (
                        <div>
                          <span className="text-gray-500">Résolution estimée:</span>
                          <span className="ml-1 text-gray-900">{formatDate(ticket.estimatedResolution)}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-500">Éléments affectés:</span>
                        <span className="ml-1 text-gray-900">{ticket.affectedElements.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Maintenance;