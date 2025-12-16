import React from 'react';
import { ApplicationQuiz } from '../components/ApplicationQuiz';

export const Apply: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-6 pb-12 px-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Deine Bewerbung</h1>
      </div>
      <ApplicationQuiz />
    </div>
  );
};