import { Button } from '@/components/ui/button';
import React from 'react';

const EmailInput = () => {
  return (
    <section className="bg-slate-900 text-white p-12 mt-24 text-left rounded-lg relative">
      <h2 className="text-4xl font-semibold mb-4">Do you have any questions?</h2>
      <p className="mb-4">Enter your email below and let's get started.</p>
      <div className="bg-white h-14 w-[600px] p-2 flex items-center">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email address"
          className="flex-1 px-4"
        />
        <Button className="uppercase tracking-wider">Continue</Button>
        <img src="/assets/Tower.png" alt="" className="absolute right-28 bottom-0 h-[400px]" />
      </div>
    </section>
  );
};

export default EmailInput;
