import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Icon from '@/components/AppIcon';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface LoginProps {
  onSignIn: (email: string, password: string) => Promise<boolean>;
  error: string | null;
  clearError: () => void;
}

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ onSignIn, error, clearError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    clearError();
    
    try {
      await onSignIn(data.email, data.password);
    } catch (err) {
      // Error is handled by the hook
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-md w-full mx-4">
        <div className="bg-card rounded-xl shadow-floating p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Shield" size={32} className="text-primary" />
            </div>
            <h1 className="font-headline text-2xl font-bold text-primary mb-2">
              Admin Access
            </h1>
            <p className="font-body text-text-secondary">
              Sign in to manage the platform
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <Icon name="AlertCircle" size={20} className="text-red-600 mr-2" />
                <p className="text-red-800 font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              type="email"
              label="Email Address"
              className="border border-gray-300"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address'
                }
              })}
              error={errors.email?.message}
              required
            />

            <Input
              type="password"
              label="Password"
              className="border border-gray-300"
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              error={errors.password?.message}
              required
            />

            <Button
              type="submit"
              variant="default"
              size="lg"
              fullWidth
              disabled={isLoading}
              iconName={isLoading ? "Loader2" : "LogIn"}
              iconPosition="right"
              className={isLoading ? "animate-spin" : ""}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="font-body text-sm text-text-secondary">
              Authorized personnel only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;