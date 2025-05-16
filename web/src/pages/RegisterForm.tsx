import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { motion } from 'framer-motion';

const registerSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    dateOfBirth: z.coerce.date({
      required_error: 'Date of birth is required',
      invalid_type_error: 'Invalid date format',
    }),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const { register: signUp, isLoading, error, user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  });

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = (data: RegisterFormData) => {
    signUp({
      name: data.name,
      email: data.email,
      password: data.password,
      dateOfBirth: data.dateOfBirth.toISOString().split('T')[0], // Format to YYYY-MM-DD
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm sm:max-w-md space-y-6 sm:space-y-8 p-6 sm:p-8 bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-700"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Create Account</h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-300">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              Sign in
            </Link>
          </p>
        </motion.div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-900/50 p-3 sm:p-4 rounded-md border border-red-700"
          >
            <p className="text-xs sm:text-sm text-red-300">{error.message}</p>
          </motion.div>
        )}

        <motion.form 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          onSubmit={handleSubmit(onSubmit)} 
          className="mt-6 sm:mt-8 space-y-4 sm:space-y-6"
        >
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-xs sm:text-sm font-medium text-gray-300"
              >
                Full Name
              </label>
              <input
                {...register('name')}
                id="name"
                type="text"
                autoComplete="name"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="mt-1 text-xs sm:text-sm text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-xs sm:text-sm font-medium text-gray-300"
              >
                Date of Birth
              </label>
              <input
                {...register('dateOfBirth')}
                id="dateOfBirth"
                type="date"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                aria-invalid={!!errors.dateOfBirth}
                max={new Date().toISOString().split('T')[0]}
              />
              {errors.dateOfBirth && (
                <p className="mt-1 text-xs sm:text-sm text-red-400">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-medium text-gray-300"
              >
                Email Address
              </label>
              <input
                {...register('email')}
                id="email"
                type="email"
                autoComplete="email"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="mt-1 text-xs sm:text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs sm:text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                {...register('password')}
                id="password"
                type="password"
                autoComplete="new-password"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                aria-invalid={!!errors.password}
              />
              {errors.password && (
                <p className="mt-1 text-xs sm:text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs sm:text-sm font-medium text-gray-300"
              >
                Confirm Password
              </label>
              <input
                {...register('confirmPassword')}
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                aria-invalid={!!errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs sm:text-sm text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            disabled={!isValid || isLoading}
            className="w-full justify-center bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Create Account
          </Button>
        </motion.form>
      </motion.div>
    </div>
  );
};
