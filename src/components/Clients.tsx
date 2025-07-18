import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Plus,
  Search,
  Filter,
  Download,
  Users,
  Building,
  Building2,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Wifi,
  Edit,
  Trash2,
  Eye,
} from 'lucide-react';

const Clients: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const clientStats = [
    { name: 'Total Clients', value: '2,847', icon: Users, color: 'bg-blue-500' },
    { name: 'Résidentiel', value: '2,234', icon: Users, color: 'bg-green-500' },
    { name: 'Entreprise', value: '487', icon: Building, color: 'bg-purple-500' },
    { name: 'Grande Entreprise', value: '126', icon: Building2, color: 'bg-orange-500' },
  ];

  const clients = [
    {
      id: '1',
      name: 'Jean Mballa',
      email: 'jean.mballa@email.com',
      phone: '+237 677 123 456',
      address: 'Quartier Makepe, Douala',
      location: { lat: 4.0311, lng: 9.7779 },
      contractType: 'residential',
      status: 'active',
      bandwidth: 50,
      installationDate: '2023-03-15',
      region: 'Littoral',
      commune: 'Douala 5ème',
      monthlyFee: 25000,
    },
    {
      id: '2',
      name: 'Société CAMTECH SARL',
      email: 'contact@camtech.cm',
      phone: '+237 233 456 789',
      address: 'Avenue Kennedy, Yaoundé',
      location: { lat: 3.8480, lng: 11.5021 },
      contractType: 'business',
      status: 'active',
      bandwidth: 200,
      installationDate: '2023-01-20',
      region: 'Centre',
      commune: 'Yaoundé 1er',
      monthlyFee: 150000,
    },
    {
      id: '3',
      name: 'Marie Fotso',
      email: 'marie.fotso@gmail.com',
      phone: '+237 698 765 432',
      address: 'Quartier Tsinga, Yaoundé',
      location: { lat: 3.8667, lng: 11.5167 },
      contractType: 'residential',
      status: 'suspended',
      bandwidth: 25,
      installationDate: '2022-11-10',
      region: 'Centre',
      commune: 'Yaoundé 3ème',
      monthlyFee: 15000,
    },
    {
      id: '4',
      name: 'ENEO Cameroun',
      email: 'it@eneo.cm',
      phone: '+237 222 123 456',
      address: 'Immeuble ENEO, Bonanjo',
      location: { lat: 4.0611, lng: 9.7579 },
      contractType: 'enterprise',
      status: 'active',
      bandwidth: 1000,
      installationDate: '2023-05-08',
      region: 'Littoral',
      commune: 'Douala 1er',
      monthlyFee: 800000,
    },
    {
      id: '5',
      name: 'Paul Nkomo',
      email: 'paul.nkomo@yahoo.fr',
      phone: '+237 655 987 654',
      address: 'Quartier Mendong, Yaoundé',
      location: { lat: 3.8333, lng: 11.5000 },
      contractType: 'residential',
      status: 'pending',
      bandwidth: 100,
      installationDate: '2023-06-01',
      region: 'Centre',
      commune: 'Yaoundé 6ème',
      monthlyFee: 45000,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getContractTypeIcon = (type: string) => {
    switch (type) {
      case 'residential':
        return Users;
      case 'business':
        return Building;
      case 'enterprise':
        return Building2;
      default:
        return Users;
    }
  };

  const getContractTypeColor = (type: string) => {
    switch (type) {
      case 'residential':
        return 'bg-green-100 text-green-800';
      case 'business':
        return 'bg-purple-100 text-purple-800';
      case 'enterprise':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || client.status === selectedStatus;
    const matchesType = selectedType === 'all' || client.contractType === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalRevenue = clients
    .filter(client => client.status === 'active')
    .reduce((sum, client) => sum + client.monthlyFee, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('clients.title')}</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestion complète de votre base clients et abonnés
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            {t('common.export')}
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            {t('clients.addClient')}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {clientStats.map((stat) => (
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

      {/* Revenue Card */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Revenus Mensuels Actifs</p>
            <p className="text-3xl font-bold text-white">
              {new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'XAF',
                minimumFractionDigits: 0,
              }).format(totalRevenue)}
            </p>
          </div>
          <div className="text-blue-100">
            <Wifi className="h-12 w-12" />
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
                placeholder="Rechercher un client..."
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
              <option value="active">Actif</option>
              <option value="suspended">Suspendu</option>
              <option value="pending">En attente</option>
            </select>
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">Tous les types</option>
              <option value="residential">Résidentiel</option>
              <option value="business">Entreprise</option>
              <option value="enterprise">Grande Entreprise</option>
            </select>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filtres avancés
          </button>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredClients.map((client) => {
            const IconComponent = getContractTypeIcon(client.contractType);
            return (
              <li key={client.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-900">{client.name}</p>
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                            {client.status}
                          </span>
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getContractTypeColor(client.contractType)}`}>
                            {client.contractType}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <Mail className="flex-shrink-0 mr-1.5 h-4 w-4" />
                          {client.email}
                          <span className="mx-2">•</span>
                          <Phone className="flex-shrink-0 mr-1.5 h-4 w-4" />
                          {client.phone}
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4" />
                          {client.address}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {client.bandwidth} Mbps
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Intl.NumberFormat('fr-FR', {
                            style: 'currency',
                            currency: 'XAF',
                            minimumFractionDigits: 0,
                          }).format(client.monthlyFee)}/mois
                        </p>
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
                  <div className="mt-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Région:</span>
                        <span className="ml-1 text-gray-900">{client.region}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Commune:</span>
                        <span className="ml-1 text-gray-900">{client.commune}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Installation:</span>
                        <span className="ml-1 text-gray-900">
                          {new Date(client.installationDate).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Coordonnées:</span>
                        <span className="ml-1 text-gray-900">
                          {client.location.lat.toFixed(4)}, {client.location.lng.toFixed(4)}
                        </span>
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

export default Clients;