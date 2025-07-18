import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Users,
  Activity,
  Wifi,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Cable,
  Server,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    {
      name: t('dashboard.totalClients'),
      value: '2,847',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
    },
    {
      name: t('dashboard.activeConnections'),
      value: '2,734',
      change: '+5%',
      changeType: 'positive',
      icon: Activity,
    },
    {
      name: t('dashboard.networkUptime'),
      value: '99.8%',
      change: '+0.2%',
      changeType: 'positive',
      icon: Wifi,
    },
    {
      name: t('dashboard.pendingTickets'),
      value: '23',
      change: '-8%',
      changeType: 'positive',
      icon: AlertTriangle,
    },
  ];

  const performanceData = [
    { name: 'Jan', uptime: 99.2, bandwidth: 85 },
    { name: 'Fév', uptime: 99.5, bandwidth: 88 },
    { name: 'Mar', uptime: 99.1, bandwidth: 92 },
    { name: 'Avr', uptime: 99.7, bandwidth: 89 },
    { name: 'Mai', uptime: 99.8, bandwidth: 94 },
    { name: 'Jun', uptime: 99.6, bandwidth: 91 },
  ];

  const regionData = [
    { name: 'Douala', clients: 1247, coverage: 78 },
    { name: 'Yaoundé', clients: 1089, coverage: 82 },
    { name: 'Bafoussam', clients: 234, coverage: 45 },
    { name: 'Bamenda', clients: 187, coverage: 38 },
    { name: 'Garoua', clients: 90, coverage: 25 },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'maintenance',
      message: 'Maintenance programmée - Secteur Bonanjo',
      time: '2 heures',
      icon: Server,
    },
    {
      id: 2,
      type: 'client',
      message: 'Nouveau client ajouté - Akwa Nord',
      time: '4 heures',
      icon: Users,
    },
    {
      id: 3,
      type: 'network',
      message: 'Extension réseau - Quartier Makepe',
      time: '6 heures',
      icon: Cable,
    },
    {
      id: 4,
      type: 'alert',
      message: 'Panne résolue - Liaison Douala-Yaoundé',
      time: '8 heures',
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.title')}</h1>
        <p className="mt-1 text-sm text-gray-500">
          {t('dashboard.welcome')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
          >
            <dt>
              <div className="absolute rounded-md bg-green-500 p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                <TrendingUp className="h-4 w-4 flex-shrink-0 self-center" />
                <span className="sr-only">
                  {item.changeType === 'positive' ? 'Increased' : 'Decreased'} by
                </span>
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Performance Chart */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {t('dashboard.performanceMetrics')}
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="uptime"
                    stroke="#10B981"
                    strokeWidth={2}
                    name="Disponibilité (%)"
                  />
                  <Line
                    type="monotone"
                    dataKey="bandwidth"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    name="Utilisation Bande Passante (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Regional Coverage */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Couverture par Région
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="clients" fill="#10B981" name="Clients" />
                  <Bar dataKey="coverage" fill="#F59E0B" name="Couverture (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {t('dashboard.recentActivity')}
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="px-6 py-4 flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <activity.icon className="h-4 w-4 text-gray-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{activity.message}</p>
              </div>
              <div className="flex-shrink-0 text-sm text-gray-500">
                Il y a {activity.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;