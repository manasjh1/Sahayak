import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function StudentOTPVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const { role } = useParams(); // Get role from URL params
  
  // Access saved state from navigation (with contact and method)
  const { contact, method } = location.state || {};
  
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(300); // 5 min in seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Redirect back if no contact/method data or role
    if (!contact || !method || !role) {
      navigate('/login/student');
      return;
    }

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

    // focus on first input on mount
    inputRefs.current[0]?.focus();

    return () => clearInterval(interval);
  }, [contact, method, role, navigate]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    if (value.length > 1) value = value.slice(-1);

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pastedData.length === 6) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isOtpComplete) return;
    setLoading(true);
    setError("");

    try {
      console.log('Sending POST request to verify OTP:', 'https://rag-bot-53xj.onrender.com/auth/verify-otp');
      console.log('Request body:', { identifier: contact, otp: otp.join(""), method: method });

      const response = await fetch("https://rag-bot-53xj.onrender.com/auth/verify-otp", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          identifier: contact,
          otp: otp.join(""),
          method: method,
        }),
      });

      console.log('Verify OTP Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || errorData.detail || `HTTP Error: ${response.status}`);
        setLoading(false);
        return;
      }

      const responseData = await response.json();
      console.log('Verify OTP Response data:', responseData);

      // Store authentication data
      if (responseData.access_token) {
        localStorage.setItem('token', responseData.access_token);
      }
      if (responseData.user) {
        localStorage.setItem('user', JSON.stringify(responseData.user));
      }
      
      // Store user role
      localStorage.setItem('userRole', role);
      localStorage.setItem('userContact', contact);

      console.log(`OTP verified successfully! Redirecting to ${role} dashboard...`);

      // Role-based navigation
      if (role === 'student') {
        navigate('/student/dashboard');
      } else if (role === 'teacher') {
        navigate('/teacher/dashboard');
      } else {
        // Fallback - shouldn't happen
        navigate('/');
      }

    } catch (err) {
      console.error('Error verifying OTP:', err);
      setError("Network error: Could not verify OTP. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log('Resending OTP to:', contact);

      const response = await fetch('https://rag-bot-53xj.onrender.com/auth/send-otp', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          identifier: contact,
          method: method,
        }),
      });

      const responseData = await response.json();
      console.log('Resend OTP Response:', responseData);

      if (!response.ok) {
        setError(responseData.message || responseData.detail || "Failed to resend OTP");
        setLoading(false);
        return;
      }

      // Reset timer and OTP fields
      setTimer(300);
      setIsResendDisabled(true);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      setError("");
      alert('New OTP sent successfully!');
      
    } catch (err) {
      console.error('Error resending OTP:', err);
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    navigate(`/login/${role}`);
  };

  // Show loading if no contact data
  if (!contact || !method || !role) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e293b 0%, #1e40af 50%, #1d4ed8 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        width: '100%',
        maxWidth: '450px',
        padding: '32px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: 'black',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px auto',
          fontSize: '48px'
        }}>
          {role === 'student' ? '🎓' : '👨‍🏫'}
        </div>

        <h1 style={{
          fontSize: '32px',
          fontWeight: '600',
          color: 'white',
          marginBottom: '8px',
          margin: '0 0 8px 0'
        }}>
          Verify OTP
        </h1>
        <p style={{
          color: '#94a3b8',
          marginBottom: '32px',
          margin: '0 0 32px 0'
        }}>
          Enter the 6-digit code sent to your {method === 'sms' ? 'phone' : method}
        </p>

        <div style={{
          backgroundColor: 'rgba(51, 65, 85, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '4px', margin: '0 0 4px 0' }}>
            OTP sent to:
          </p>
          <p style={{ color: '#06b6d4', fontWeight: '500', margin: 0 }}>{contact}</p>
        </div>

        <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#e2e8f0',
              marginBottom: '12px',
              textAlign: 'left'
            }}>
              Enter OTP
            </label>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '8px',
              marginBottom: '16px'
            }}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: 'rgba(51, 65, 85, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: '600',
                    textAlign: 'center',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  maxLength={1}
                  inputMode="numeric"
                  pattern="[0-9]"
                />
              ))}
            </div>

            <div style={{
              fontSize: '14px',
              color: '#94a3b8',
              marginBottom: '24px'
            }}>
              Code expires in <span style={{ color: '#06b6d4', fontWeight: '600' }}>{formatTimer(timer)}</span>
            </div>
          </div>

          {error && (
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '16px'
            }}>
              <p style={{ color: '#f87171', fontSize: '14px', margin: 0 }}>{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={!isOtpComplete || loading}
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: '8px',
              fontWeight: '600',
              color: 'white',
              border: 'none',
              fontSize: '16px',
              cursor: isOtpComplete && !loading ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              background: isOtpComplete && !loading 
                ? 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)' 
                : 'rgba(51, 65, 85, 0.6)',
              marginBottom: '24px'
            }}
          >
            {loading ? "Verifying..." : `Login to ${role} Dashboard`}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '8px', margin: '0 0 8px 0' }}>
            Didn't receive the code?
          </p>
          <button
            onClick={handleResend}
            disabled={isResendDisabled || loading}
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: isResendDisabled || loading ? '#64748b' : '#06b6d4',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: isResendDisabled || loading ? 'not-allowed' : 'pointer',
              textDecoration: isResendDisabled || loading ? 'none' : 'underline',
              transition: 'color 0.3s ease'
            }}
          >
            {isResendDisabled ? `Resend in ${formatTimer(timer)}` : loading ? "Resending..." : "Resend OTP"}
          </button>
        </div>

        <button
          onClick={goBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: '#06b6d4',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'color 0.3s ease'
          }}
        >
          ← Back to {role} Login
        </button>
      </div>
    </div>
  );
}
// import React, { useState, useEffect, useRef } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";

// export default function StudentOTPVerification() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { role } = useParams(); // Get role from URL params
  
//   // Access saved state from navigation (with contact and method)
//   const { contact, method } = location.state || {};
  
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [timer, setTimer] = useState(300); // 5 min in seconds
//   const [isResendDisabled, setIsResendDisabled] = useState(true);
//   const inputRefs = useRef([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     // Redirect back if no contact/method data or role
//     if (!contact || !method || !role) {
//       navigate('/login/student');
//       return;
//     }

//     const interval = setInterval(() => {
//       setTimer((prev) => {
//         if (prev <= 1) {
//           setIsResendDisabled(false);
//           clearInterval(interval);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     // focus on first input on mount
//     inputRefs.current[0]?.focus();

//     return () => clearInterval(interval);
//   }, [contact, method, role, navigate]);

//   const formatTimer = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//   };

//   const handleOtpChange = (index, value) => {
//     if (!/^\d?$/.test(value)) return;
//     if (value.length > 1) value = value.slice(-1);

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 5) inputRefs.current[index + 1]?.focus();
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       const newOtp = [...otp];
//       newOtp[index - 1] = "";
//       setOtp(newOtp);
//       inputRefs.current[index - 1]?.focus();
//     } else if (e.key === "ArrowLeft" && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     } else if (e.key === "ArrowRight" && index < 5) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
//     if (pastedData.length === 6) {
//       const newOtp = pastedData.split("");
//       setOtp(newOtp);
//       inputRefs.current[5]?.focus();
//     }
//   };

//   const isOtpComplete = otp.every((digit) => digit !== "");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!isOtpComplete) return;
//     setLoading(true);
//     setError("");

//     try {
//       console.log('Sending POST request to verify OTP:', 'https://rag-bot-53xj.onrender.com/auth/verify-otp');
//       console.log('Request body:', { identifier: contact, otp: otp.join(""), method: method });

//       const response = await fetch("https://rag-bot-53xj.onrender.com/auth/verify-otp", {
//         method: "POST",
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           identifier: contact,
//           otp: otp.join(""),
//           method: method,
//         }),
//       });

//       console.log('Verify OTP Response status:', response.status);

//       if (!response.ok) {
//         const errorData = await response.json();
//         setError(errorData.message || errorData.detail || `HTTP Error: ${response.status}`);
//         setLoading(false);
//         return;
//       }

//       const responseData = await response.json();
//       console.log('Verify OTP Response data:', responseData);

//       // Store authentication data
//       if (responseData.access_token) {
//         localStorage.setItem('token', responseData.access_token);
//       }
//       if (responseData.user) {
//         localStorage.setItem('user', JSON.stringify(responseData.user));
//       }
      
//       // Store user role
//       localStorage.setItem('userRole', role);
//       localStorage.setItem('userContact', contact);

//       console.log(`OTP verified successfully! Redirecting to ${role} dashboard...`);

//       // Role-based navigation
//       if (role === 'student') {
//         navigate('/student/dashboard');
//       } else if (role === 'teacher') {
//         navigate('/teacher/dashboard');
//       } else {
//         // Fallback - shouldn't happen
//         navigate('/');
//       }

//     } catch (err) {
//       console.error('Error verifying OTP:', err);
//       setError("Network error: Could not verify OTP. Please check your connection.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResend = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       console.log('Resending OTP to:', contact);

//       const response = await fetch('https://rag-bot-53xj.onrender.com/auth/send-otp', {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           identifier: contact,
//           method: method,
//         }),
//       });

//       const responseData = await response.json();
//       console.log('Resend OTP Response:', responseData);

//       if (!response.ok) {
//         setError(responseData.message || responseData.detail || "Failed to resend OTP");
//         setLoading(false);
//         return;
//       }

//       // Reset timer and OTP fields
//       setTimer(300);
//       setIsResendDisabled(true);
//       setOtp(["", "", "", "", "", ""]);
//       inputRefs.current[0]?.focus();
//       setError("");
//       alert('New OTP sent successfully!');
      
//     } catch (err) {
//       console.error('Error resending OTP:', err);
//       setError("Failed to resend OTP. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const goBack = () => {
//     navigate(`/login/${role}`);
//   };

//   // Show loading if no contact data
//   if (!contact || !method || !role) {
//     return (
//       <div style={{
//         minHeight: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         fontSize: '18px'
//       }}>
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #1e293b 0%, #1e40af 50%, #1d4ed8 100%)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       padding: '16px'
//     }}>
//       <div style={{
//         backgroundColor: 'rgba(30, 41, 59, 0.95)',
//         backdropFilter: 'blur(16px)',
//         border: '1px solid rgba(255, 255, 255, 0.1)',
//         borderRadius: '16px',
//         boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
//         width: '100%',
//         maxWidth: '450px',
//         padding: '32px',
//         textAlign: 'center'
//       }}>
//         <div style={{
//           width: '80px',
//           height: '80px',
//           backgroundColor: 'black',
//           borderRadius: '50%',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           margin: '0 auto 24px auto',
//           fontSize: '48px'
//         }}>
//           {role === 'student' ? '🎓' : '👨‍🏫'}
//         </div>

//         <h1 style={{
//           fontSize: '32px',
//           fontWeight: '600',
//           color: 'white',
//           marginBottom: '8px',
//           margin: '0 0 8px 0'
//         }}>
//           Verify OTP
//         </h1>
//         <p style={{
//           color: '#94a3b8',
//           marginBottom: '32px',
//           margin: '0 0 32px 0'
//         }}>
//           Enter the 6-digit code sent to your {method === 'sms' ? 'phone' : method}
//         </p>

//         <div style={{
//           backgroundColor: 'rgba(51, 65, 85, 0.5)',
//           border: '1px solid rgba(255, 255, 255, 0.1)',
//           borderRadius: '8px',
//           padding: '16px',
//           marginBottom: '24px'
//         }}>
//           <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '4px', margin: '0 0 4px 0' }}>
//             OTP sent to:
//           </p>
//           <p style={{ color: '#06b6d4', fontWeight: '500', margin: 0 }}>{contact}</p>
//         </div>

//         <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
//           <div style={{ marginBottom: '24px' }}>
//             <label style={{
//               display: 'block',
//               fontSize: '14px',
//               fontWeight: '500',
//               color: '#e2e8f0',
//               marginBottom: '12px',
//               textAlign: 'left'
//             }}>
//               Enter OTP
//             </label>

//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               gap: '8px',
//               marginBottom: '16px'
//             }}>
//               {otp.map((digit, index) => (
//                 <input
//                   key={index}
//                   ref={(el) => (inputRefs.current[index] = el)}
//                   type="text"
//                   value={digit}
//                   onChange={(e) => handleOtpChange(index, e.target.value)}
//                   onKeyDown={(e) => handleKeyDown(index, e)}
//                   onPaste={handlePaste}
//                   style={{
//                     width: '48px',
//                     height: '48px',
//                     backgroundColor: 'rgba(51, 65, 85, 0.6)',
//                     border: '1px solid rgba(255, 255, 255, 0.2)',
//                     borderRadius: '8px',
//                     color: 'white',
//                     fontSize: '20px',
//                     fontWeight: '600',
//                     textAlign: 'center',
//                     outline: 'none',
//                     transition: 'all 0.3s ease'
//                   }}
//                   maxLength={1}
//                   inputMode="numeric"
//                   pattern="[0-9]"
//                 />
//               ))}
//             </div>

//             <div style={{
//               fontSize: '14px',
//               color: '#94a3b8',
//               marginBottom: '24px'
//             }}>
//               Code expires in <span style={{ color: '#06b6d4', fontWeight: '600' }}>{formatTimer(timer)}</span>
//             </div>
//           </div>

//           {error && (
//             <div style={{
//               backgroundColor: 'rgba(239, 68, 68, 0.1)',
//               border: '1px solid rgba(239, 68, 68, 0.2)',
//               borderRadius: '8px',
//               padding: '12px',
//               marginBottom: '16px'
//             }}>
//               <p style={{ color: '#f87171', fontSize: '14px', margin: 0 }}>{error}</p>
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={!isOtpComplete || loading}
//             style={{
//               width: '100%',
//               padding: '14px 16px',
//               borderRadius: '8px',
//               fontWeight: '600',
//               color: 'white',
//               border: 'none',
//               fontSize: '16px',
//               cursor: isOtpComplete && !loading ? 'pointer' : 'not-allowed',
//               transition: 'all 0.3s ease',
//               background: isOtpComplete && !loading 
//                 ? 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)' 
//                 : 'rgba(51, 65, 85, 0.6)',
//               marginBottom: '24px'
//             }}
//           >
//             {loading ? "Verifying..." : `Login to ${role} Dashboard`}
//           </button>
//         </form>

//         <div style={{ textAlign: 'center', marginBottom: '24px' }}>
//           <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '8px', margin: '0 0 8px 0' }}>
//             Didn't receive the code?
//           </p>
//           <button
//             onClick={handleResend}
//             disabled={isResendDisabled || loading}
//             style={{
//               fontSize: '14px',
//               fontWeight: '600',
//               color: isResendDisabled || loading ? '#64748b' : '#06b6d4',
//               backgroundColor: 'transparent',
//               border: 'none',
//               cursor: isResendDisabled || loading ? 'not-allowed' : 'pointer',
//               textDecoration: isResendDisabled || loading ? 'none' : 'underline',
//               transition: 'color 0.3s ease'
//             }}
//           >
//             {isResendDisabled ? `Resend in ${formatTimer(timer)}` : loading ? "Resending..." : "Resend OTP"}
//           </button>
//         </div>

//         <button
//           onClick={goBack}
//           style={{
//             display: 'inline-flex',
//             alignItems: 'center',
//             gap: '8px',
//             fontSize: '14px',
//             color: '#06b6d4',
//             backgroundColor: 'transparent',
//             border: 'none',
//             cursor: 'pointer',
//             transition: 'color 0.3s ease'
//           }}




