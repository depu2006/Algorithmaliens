import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, PhoneCall, Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import SEO from '../components/SEO';
import { submitBookCallForm } from '../services/googleSheets';

const BookCall = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const res = await submitBookCallForm(data);
      if (res.success) {
        showToast(
          'success',
          res.mock
            ? 'Success! (Demo Mode) Consultation scheduled in sheets.'
            : 'Appointment requested! We will reach out with a meeting link shortly.'
        );
        reset();
      } else {
        showToast('error', 'Failed to request. Please try again.');
      }
    } catch (error) {
      showToast('error', 'Network error. Please check your connectivity.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title="Book A Consultation Call"
        description="Book a free consultation with our technical team to discuss custom website builds, Android/iOS app developments, and custom AI automations."
      />

      {/* Hero Header */}
      <section className="hero-padding text-center bg-black bg-opacity-25 border-bottom" style={{ borderColor: 'rgba(138, 92, 255, 0.1) !important' }}>
        <div className="container">
          <span className="text-gradient fw-bold text-uppercase tracking-wider mb-2 d-block">Consultation</span>
          <h1 className="display-4 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Book A Call</h1>
          <p className="text-muted-custom mx-auto mb-0" style={{ maxWidth: '650px', fontSize: '1.1rem' }}>
            Fill out your project specifications to schedule a free 30-minute tech assessment call with our senior architects.
          </p>
        </div>
      </section>

      {/* Booking Form Content */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '750px' }}>
          <div className="card-custom p-5" style={{ background: 'linear-gradient(135deg, rgba(23,0,38,0.7) 0%, rgba(10,0,21,0.9) 100%)' }}>
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="d-flex align-items-center justify-content-center rounded-3 bg-info bg-opacity-10 border border-info p-3" style={{ width: '48px', height: '48px' }}>
                <PhoneCall className="text-gradient-cyan" />
              </div>
              <div>
                <h3 className="fw-bold mb-0 text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>Request Consultation</h3>
                <p className="text-muted-custom small mb-0">Free Technical Roadmap & Estimate</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              
              {/* Full Name */}
              <div className="mb-4">
                <label htmlFor="fullName" className="form-label form-label-custom">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  disabled={submitting}
                  className={`form-control form-control-custom ${errors.fullName ? 'is-invalid border-danger' : ''}`}
                  placeholder="John Doe"
                  {...register('fullName', { required: 'Full Name is required' })}
                />
                {errors.fullName && (
                  <span className="text-danger small mt-1 d-block">{errors.fullName.message}</span>
                )}
              </div>

              <div className="row">
                {/* Email */}
                <div className="col-md-6 mb-4">
                  <label htmlFor="email" className="form-label form-label-custom">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    disabled={submitting}
                    className={`form-control form-control-custom ${errors.email ? 'is-invalid border-danger' : ''}`}
                    placeholder="john@example.com"
                    {...register('email', { 
                      required: 'Email address is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address format'
                      }
                    })}
                  />
                  {errors.email && (
                    <span className="text-danger small mt-1 d-block">{errors.email.message}</span>
                  )}
                </div>

                {/* Phone */}
                <div className="col-md-6 mb-4">
                  <label htmlFor="phone" className="form-label form-label-custom">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    disabled={submitting}
                    className={`form-control form-control-custom ${errors.phone ? 'is-invalid border-danger' : ''}`}
                    placeholder="+91 98765 43210"
                    {...register('phone', { 
                      required: 'Phone number is required',
                      pattern: {
                        value: /^\+?[1-9]\d{1,14}$/,
                        message: 'Invalid phone format (numbers and country code only)'
                      }
                    })}
                  />
                  {errors.phone && (
                    <span className="text-danger small mt-1 d-block">{errors.phone.message}</span>
                  )}
                </div>
              </div>

              {/* Company Name */}
              <div className="mb-4">
                <label htmlFor="companyName" className="form-label form-label-custom">Company / Institute Name (Optional)</label>
                <input
                  type="text"
                  id="companyName"
                  disabled={submitting}
                  className="form-control form-control-custom"
                  placeholder="Enterprise Inc."
                  {...register('companyName')}
                />
              </div>

              {/* Service Required */}
              <div className="mb-4">
                <label htmlFor="serviceRequired" className="form-label form-label-custom">Service Required</label>
                <select
                  id="serviceRequired"
                  disabled={submitting}
                  className={`form-select form-control-custom ${errors.serviceRequired ? 'is-invalid border-danger' : ''}`}
                  {...register('serviceRequired', { required: 'Please select a service' })}
                  style={{ appearance: 'auto' }}
                >
                  <option value="">Select a service category...</option>
                  <option value="Website Development">Website Development</option>
                  <option value="App Development">App Development</option>
                  <option value="AI Automation">AI Automation</option>
                  <option value="Software Development">Software Development</option>
                  <option value="Other">Other / Not Listed</option>
                </select>
                {errors.serviceRequired && (
                  <span className="text-danger small mt-1 d-block">{errors.serviceRequired.message}</span>
                )}
              </div>

              {/* Project Description */}
              <div className="mb-4">
                <label htmlFor="projectDescription" className="form-label form-label-custom">Project Overview / Goals</label>
                <textarea
                  id="projectDescription"
                  rows="4"
                  disabled={submitting}
                  className={`form-control form-control-custom ${errors.projectDescription ? 'is-invalid border-danger' : ''}`}
                  placeholder="Tell us about what you want to build (timeline, budget, features, core goals)..."
                  {...register('projectDescription', { 
                    required: 'Project details are required to customize your call agenda',
                    minLength: { value: 10, message: 'Please write a bit more about your project goals' }
                  })}
                />
                {errors.projectDescription && (
                  <span className="text-danger small mt-1 d-block">{errors.projectDescription.message}</span>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="btn-gradient w-100 justify-content-center"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="animate-spin me-2" size={18} />
                    <span>Booking Appointment...</span>
                  </>
                ) : (
                  <>
                    <Calendar size={18} />
                    <span>Confirm Consultation Request</span>
                  </>
                )}
              </button>

            </form>
          </div>
        </div>
      </section>

      {/* Floating Alerts */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`custom-toast ${toast.type === 'error' ? 'error' : ''}`}
          >
            {toast.type === 'error' ? (
              <AlertTriangle className="text-danger" size={24} />
            ) : (
              <CheckCircle2 className="text-success" size={24} />
            )}
            <div>
              <h6 className="fw-bold mb-0 text-white">
                {toast.type === 'error' ? 'Failed' : 'Success'}
              </h6>
              <p className="mb-0 text-muted-custom small">{toast.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BookCall;
