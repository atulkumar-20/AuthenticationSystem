import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { authApi } from '../apiService/auth.api';
import type { User } from '../types/auth';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const allUsers = await authApi.getAllUsers();
      const formattedUsers = allUsers.map((user) => ({
        ...user,
        id: user._id || user.id,
      }));
      setUsers(formattedUsers);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDeleteUser = async (userId: string) => {
    if (!userId) {
      toast.error('Invalid user ID');
      return;
    }

    try {
      setDeleting(userId);
      console.log('Deleting user with ID:', userId);
      await authApi.deleteUser(userId);
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      console.error('Failed to delete user:', error);
      toast.error('Failed to delete user');
    } finally {
      setDeleting(null);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-4 sm:p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto h-full"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4 sm:gap-0"
        >
          <h1 className="text-xl sm:text-2xl font-bold text-white text-center sm:text-left">
            Welcome {user?.name}
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 shadow-lg w-full sm:w-auto"
          >
            Logout
          </motion.button>
        </motion.div>

        {/* All Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-gray-800/90 backdrop-blur-sm shadow-xl rounded-lg overflow-hidden mb-6 sm:mb-8 border border-gray-700"
        >
          <h2 className="text-lg sm:text-xl font-semibold p-3 sm:p-4 border-b border-gray-700 text-white">
            All Users
          </h2>
          {loading ? (
            <div className="p-4 text-center text-gray-300">
              Loading users...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <motion.table
                variants={container}
                initial="hidden"
                animate="show"
                className="min-w-full divide-y divide-gray-700"
              >
                <thead className="bg-gray-900/50">
                  <tr>
                    <th className="px-3 py-3 sm:px-6 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-3 py-3 sm:px-6 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-3 py-3 sm:px-6 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden md:table-cell">
                      Date of Birth
                    </th>
                    <th className="px-3 py-3 sm:px-6 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {users.map((userItem) => {
                    const userId = userItem._id || userItem.id;
                    return (
                      <motion.tr
                        key={userId}
                        variants={item}
                        className="hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-white">
                          {userItem.name}
                        </td>
                        <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-300 max-w-[120px] sm:max-w-none truncate">
                          {userItem.email}
                        </td>
                        <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-300 hidden md:table-cell">
                          {new Date(userItem.dateOfBirth).toLocaleDateString()}
                        </td>
                        <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-300">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => userId && handleDeleteUser(userId)}
                            disabled={
                              deleting === userId ||
                              userId === (user?._id || user?.id)
                            }
                            className={`px-2 py-1 sm:px-3 sm:py-1 rounded-md text-white text-xs sm:text-sm ${
                              userId === (user?._id || user?.id)
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-red-500 hover:bg-red-600'
                            }`}
                          >
                            {deleting === userId ? 'Deleting...' : 'Delete'}
                          </motion.button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </motion.table>
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-gray-800/90 backdrop-blur-sm p-3 sm:p-4 rounded-lg text-xs sm:text-sm text-gray-300 border border-gray-700"
        >
          Note: Hey {user?.name}, You are logged in and now you can delete other users except yourself.
        </motion.div>
      </motion.div>
    </div>
  );
};
