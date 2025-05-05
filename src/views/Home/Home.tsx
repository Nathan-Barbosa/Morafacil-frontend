import {
  useGetRolesListQuery,
  useGetCondosListQuery,
  useGetFinesQuery,
} from "../../services";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { useGetUsersListQuery } from "../../services/UsersService";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00C49F"];

const Home = () => {
  const { data: usersData } = useGetUsersListQuery();
  const { data: condosData } = useGetCondosListQuery({ pageNumber: 1, pageSize: 100 });
  const { data: finesData } = useGetFinesQuery({ pageNumber: 1, pageSize: 100 });

  const [roleStats, setRoleStats] = useState<{ name: string; value: number }[]>([]);
  const [fineStatusStats, setFineStatusStats] = useState<{ status: string; total: number }[]>([]);
  const [finesPerMonth, setFinesPerMonth] = useState<{ month: string; total: number }[]>([]);

  useEffect(() => {
    // Distribuição de perfis (roles)
    if (usersData?.data) {
      const rolesCount: Record<string, number> = {};
      usersData.data.forEach((user) => {
        user.roles.forEach((role) => {
          rolesCount[role] = (rolesCount[role] || 0) + 1;
        });
      });
      setRoleStats(Object.entries(rolesCount).map(([name, value]) => ({ name, value })));
    }

    // Multas por status
    if (finesData?.data) {
      const statusCount: Record<number, number> = {};
      finesData.data.forEach((fine) => {
        const status = fine.status ?? 0;
        statusCount[+status] = (statusCount[+status] || 0) + 1;
      });
    
      const statusLabels: Record<number, string> = {
        0: "Pendente",
        1: "Pago",
        2: "Cancelado",
      };
    
      setFineStatusStats(
        Object.entries(statusCount).map(([status, total]) => ({
          status: statusLabels[+status] || "Desconhecido",
          total,
        }))
      );

      // Multas por mês
      const monthMap: Record<string, number> = {};
      finesData.data.forEach((fine) => {
        const date = new Date(fine.data ?? fine.data ?? "");
        if (!isNaN(date.getTime())) {
          const month = date.toLocaleDateString("pt-BR", {
            month: "short",
            year: "numeric",
          });
          monthMap[month] = (monthMap[month] || 0) + 1;
        }
      });
      const sortedMonths = Object.entries(monthMap)
        .map(([month, total]) => ({ month, total }))
        .sort((a, b) => new Date(`01 ${a.month}`).getTime() - new Date(`01 ${b.month}`).getTime());
      setFinesPerMonth(sortedMonths);
    }
  }, [usersData, finesData]);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-gray-600">Usuários</h2>
          <p className="text-3xl font-bold">{usersData?.data.length || 0}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-gray-600">Condomínios</h2>
          <p className="text-3xl font-bold">{condosData?.data.length || 0}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h2 className="text-gray-600">Multas</h2>
          <p className="text-3xl font-bold">{finesData?.data.length || 0}</p>
        </div>
      </div>

      {/* Gráfico de pizza - perfis */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Distribuição de Perfis</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={roleStats} dataKey="value" nameKey="name" outerRadius={100}>
              {roleStats.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de barras - status das multas */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Status das Multas</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={fineStatusStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de linhas - multas por mês */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Multas por Mês</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={finesPerMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export { Home };
