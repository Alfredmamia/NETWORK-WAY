import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Plus,
  Search,
  Filter,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Edit,
  Eye,
  Trash2,
} from 'lucide-react';

const Planning: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const projectStats = [
    { name: 'Projets Actifs', value: '12', icon: Clock, color: 'bg-blue-500' },
    { name: 'En Planification', value: '8', icon: AlertCircle, color: 'bg-yellow-500' },
    { name: 'Terminés', value: '34', icon: CheckCircle, color: 'bg-green-500' },
    { name: 'Budget Total', value: '2.4M', icon: DollarSign, color: 'bg-purple-500' },
  ];

  const projects = [
    {
      id: 'PRJ-2023-001',
      name: 'Extension Réseau Makepe',
      description: 'Déploiement de la fibre optique dans le quartier Makepe pour couvrir 500 nouveaux foyers',
      status: 'in_progress',
      budget: 450000000,
      estimatedCost: 425000000,
      startDate: '2023-06-01',
      endDate: '2023-08-31',
      progress: 65,
      coverage: {
        region: 'Littoral',
        communes: ['Douala 5ème'],
        estimatedClients: 500,
        area: '2.5 km²',
      },
      materials: [
        { type: 'Câble fibre 48F', quantity: 5000, unitCost: 2500, unit: 'mètres' },
        { type: 'Boîtiers de jonction', quantity: 25, unitCost: 75000, unit: 'unités' },
        { type: 'Poteaux béton', quantity: 15, unitCost: 150000, unit: 'unités' },
      ],
      team: 'Équipe Technique A',
      manager: 'Jean Mballa',
    },
    {
      id: 'PRJ-2023-002',
      name: 'Modernisation Infrastructure Yaoundé Centre',
      description: 'Remplacement des équipements obsolètes et mise à niveau du réseau principal',
      status: 'planning',
      budget: 800000000,
      estimatedCost: 750000000,
      startDate: '2023-07-15',
      endDate: '2023-11-30',
      progress: 15,
      coverage: {
        region: 'Centre',
        communes: ['Yaoundé 1er', 'Yaoundé 2ème'],
        estimatedClients: 1200,
        area: '8.2 km²',
      },
      materials: [
        { type: 'DSLAM Huawei', quantity: 3, unitCost: 15000000, unit: 'unités' },
        { type: 'Câble fibre 96F', quantity: 8000, unitCost: 3500, unit: 'mètres' },
        { type: 'Armoires techniques', quantity: 8, unitCost: 2500000, unit: 'unités' },
      ],
      team: 'Équipe Technique B',
      manager: 'Marie Fotso',
    },
    {
      id: 'PRJ-2023-003',
      name: 'Couverture Rurale Bafoussam',
      description: 'Extension du réseau vers les zones rurales autour de Bafoussam',
      status: 'approved',
      budget: 320000000,
      estimatedCost: 310000000,
      startDate: '2023-08-01',
      endDate: '2023-12-15',
      progress: 5,
      coverage: {
        region: 'Ouest',
        communes: ['Bafoussam 1er', 'Bafoussam 2ème'],
        estimatedClients: 300,
        area: '15.7 km²',
      },
      materials: [
        { type: 'Câble fibre 24F', quantity: 12000, unitCost: 1800, unit: 'mètres' },
        { type: 'Répéteurs', quantity: 6, unitCost: 5000000, unit: 'unités' },
        { type: 'Poteaux bois', quantity: 45, unitCost: 85000, unit: 'unités' },
      ],
      team: 'Équipe Technique C',
      manager: 'Paul Nkomo',
    },
    {
      id: 'PRJ-2023-004',
      name: 'Maintenance Préventive Douala',
      description: 'Programme de maintenance préventive sur l\'ensemble du réseau de Douala',
      status: 'completed',
      budget: 180000000,
      estimatedCost: 165000000,
      startDate: '2023-03-01',
      endDate: '2023-05-31',
      progress: 100,
      coverage: {
        region: 'Littoral',
        communes: ['Douala 1er', 'Douala 2ème', 'Douala 3ème', 'Douala 4ème', 'Douala 5ème'],
        estimatedClients: 2000,
        area: '45.3 km²',
      },
      materials: [
        { type: 'Pièces de rechange', quantity: 1, unitCost: 50000000, unit: 'lot' },
        { type: 'Équipements de test', quantity: 1, unitCost: 25000000, unit: 'lot' },
      ],
      team: 'Toutes les équipes',
      manager: 'Équipe Management',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'planning':
        return AlertCircle;
      case 'approved':
        return CheckCircle;
      case 'in_progress':
        return Clock;
      case 'completed':
        return CheckCircle;
      default:
        return AlertCircle;
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.coverage.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const calculateTotalMaterialCost = (materials: any[]) => {
    return materials.reduce((total, material) => total + (material.quantity * material.unitCost), 0);
  };

  const totalBudget = projects.reduce((sum, project) => sum + project.budget, 0);
  const totalEstimatedCost = projects.reduce((sum, project) => sum + project.estimatedCost, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('planning.title')}</h1>
          <p className="mt-1 text-sm text-gray-500">
            Planification et suivi des projets d'extension et de maintenance réseau
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            {t('planning.addProject')}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {projectStats.map((stat) => (
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

      {/* Budget Overview */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Vue d'ensemble Budgétaire</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-purple-100 text-sm">Budget Total Alloué</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(totalBudget)}</p>
              </div>
              <div>
                <p className="text-purple-100 text-sm">Coût Estimé Total</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(totalEstimatedCost)}</p>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-purple-100 text-sm">
                Économies potentielles: {formatCurrency(totalBudget - totalEstimatedCost)}
              </p>
            </div>
          </div>
          <div className="text-purple-100">
            <DollarSign className="h-16 w-16" />
          </div>
        </div>
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
                placeholder="Rechercher un projet..."
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
              <option value="planning">En planification</option>
              <option value="approved">Approuvé</option>
              <option value="in_progress">En cours</option>
              <option value="completed">Terminé</option>
            </select>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filtres avancés
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.map((project) => {
          const StatusIcon = getStatusIcon(project.status);
          const materialCost = calculateTotalMaterialCost(project.materials);
          
          return (
            <div key={project.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <StatusIcon className="w-6 h-6 text-gray-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                        <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{project.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">#{project.id}</p>
                      <p className="text-sm text-gray-500">{project.progress}% terminé</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Progression</span>
                    <span className="text-gray-900 font-medium">{project.progress}%</span>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Project Details Grid */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Timeline & Budget */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-900">Planning & Budget</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">Début:</span>
                        <span className="ml-1 text-gray-900">{formatDate(project.startDate)}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">Fin:</span>
                        <span className="ml-1 text-gray-900">{formatDate(project.endDate)}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">Budget:</span>
                        <span className="ml-1 text-gray-900">{formatCurrency(project.budget)}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">Estimé:</span>
                        <span className="ml-1 text-gray-900">{formatCurrency(project.estimatedCost)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Coverage */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-900">Couverture</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">Région:</span>
                        <span className="ml-1 text-gray-900">{project.coverage.region}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">Communes:</span>
                        <span className="ml-1 text-gray-900">{project.coverage.communes.join(', ')}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">Clients estimés:</span>
                        <span className="ml-1 text-gray-900">{project.coverage.estimatedClients}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">Surface:</span>
                        <span className="ml-1 text-gray-900">{project.coverage.area}</span>
                      </div>
                    </div>
                  </div>

                  {/* Team & Materials */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-900">Équipe & Matériaux</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Truck className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">Équipe:</span>
                        <span className="ml-1 text-gray-900">{project.team}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">Manager:</span>
                        <span className="ml-1 text-gray-900">{project.manager}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">Coût matériaux:</span>
                        <span className="ml-1 text-gray-900">{formatCurrency(materialCost)}</span>
                      </div>
                      <div className="flex items-center">
                        <Truck className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">Types matériaux:</span>
                        <span className="ml-1 text-gray-900">{project.materials.length}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Materials Detail */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Détail des Matériaux</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Matériau
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantité
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Prix Unitaire
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {project.materials.map((material, index) => (
                          <tr key={index}>
                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                              {material.type}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                              {material.quantity.toLocaleString()} {material.unit}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                              {formatCurrency(material.unitCost)}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {formatCurrency(material.quantity * material.unitCost)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Planning;