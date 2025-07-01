import React from 'react';
import SignUpForm from './SignUpForm';
import Illustration from './Illustration';

const SignUpPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left Panel: Illustration & Pitch */}
      <div className="md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-br from-primary to-primary/80 text-white p-8">
        <Illustration className="w-full" />
      </div>
      {/* Right Panel: Form */}
      <div className="md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage; 