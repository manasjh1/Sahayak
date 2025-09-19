


import React, { useState, useEffect, useRef } from 'react';

export default function StudentOTPVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [email] = useState('your.email@example.com'); // This would come from props or state management
  const inputRefs = useRef([]);

  // Timer countdown effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setIsResendDisabled(false);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format timer display
  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    // Only allow single digit numbers
    if (!/^\d?$/.test(value)) return;
    if (value.length > 1) value = value.slice(-1);
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData.length === 6) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  // Check if OTP is complete
  const isOtpComplete = otp.every(digit => digit !== '');

  // Handle form submission
  const handleSubmit = () => {
    if (isOtpComplete) {
      const otpValue = otp.join('');
      console.log('OTP submitted:', otpValue);
      // Handle OTP verification logic here
      alert(`OTP ${otpValue} submitted for verification!`);
    }
  };

  // Handle resend OTP
  const handleResend = () => {
    setTimer(300);
    setIsResendDisabled(true);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    console.log('OTP resent to:', email);
    alert('New OTP sent to your email!');
  };

  // Handle back navigation
  const goBack = () => {
    console.log('Going back to email entry');
    // Handle navigation back to email entry
  };

  return (
    <div className="min-h-screen bg-gradient-to-br black via-blue-800 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-slate-800/95 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
        {/* Logo */}
        <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl text-white">🎓</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold text-white mb-2">Verify OTP</h1>
        <p className="text-slate-400 mb-8">Enter the 6-digit code sent to your email</p>

        {/* Email Info */}
        <div className="bg-slate-700/50 border border-white/10 rounded-lg p-4 mb-6">
          <p className="text-sm text-slate-300 mb-1">OTP sent to:</p>
          <p className="text-teal-400 font-medium">{email}</p>
        </div>

        {/* OTP Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-200 mb-3 text-left">
            Enter OTP
          </label>
          
          {/* OTP Input Fields */}
          <div className="flex justify-between gap-2 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 bg-slate-700/60 border border-white/20 rounded-lg text-white text-xl font-semibold text-center focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 focus:bg-slate-700/80 outline-none transition-all duration-300"
                maxLength={1}
                inputMode="numeric"
                pattern="[0-9]"
              />
            ))}
          </div>

          {/* Timer */}
          <div className="text-sm text-slate-400 mb-6">
            Code expires in <span className="text-teal-400 font-semibold">{formatTimer(timer)}</span>
          </div>
        </div>

        {/* Verify Button */}
        <button
          onClick={handleSubmit}
          disabled={!isOtpComplete}
          className={`w-full py-3.5 px-4 rounded-lg font-semibold text-white transition-all duration-300 mb-6 ${
            isOtpComplete
              ? 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-500/25 active:translate-y-0'
              : 'bg-slate-700/60 cursor-not-allowed'
          }`}
        >
          Verify & Continue
        </button>

        {/* Resend Section */}
        <div className="text-center mb-6">
          <p className="text-sm text-slate-400 mb-2">Didn't receive the code?</p>
          <button
            onClick={handleResend}
            disabled={isResendDisabled}
            className={`text-sm font-semibold transition-colors duration-300 ${
              isResendDisabled
                ? 'text-slate-500 cursor-not-allowed'
                : 'text-teal-400 hover:text-teal-300 underline'
            }`}
          >
            {isResendDisabled ? `Resend in ${formatTimer(timer)}` : 'Resend OTP'}
          </button>
        </div>

        {/* Back Link */}
        <button
          onClick={goBack}
          className="inline-flex items-center gap-2 text-sm text-teal-400 hover:text-teal-300 transition-colors duration-300"
        >
          <span>←</span>
          Back to email entry
        </button>
      </div>
    </div>
  );
}