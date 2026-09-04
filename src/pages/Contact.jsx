import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Send, AlertTriangle, CircleCheck, LoaderCircle, ChevronDown } from 'lucide-react';
import { LinkedIn as Linkedin, Twitter, GitHub as Github } from '../components/SocialIcons';
import { motion, AnimatePresence } from 'framer-motion';

import SEO from '../components/SEO';
import { api } from '../services/api';

const Contact = () => {
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
      const payload = {
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        type: 'contact'
      };
      const res = await api.public.submitContact(payload);
      if (res && res.success) {
        showToast('success', res.message || 'Thank you! Your message has been saved. We will contact you soon.');
        reset();
      } else {
        showToast('error', (res && res.error) || 'Submission failed. Please try again.');
      }
    } catch (error) {
      showToast('error', error.message || 'Something went wrong. Please check your internet and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title="Contact Us"
        description="Get in touch with AlgorithmAliens Pvt. Ltd. Submit support requests, club partnerships, and corporate inquiry forms."
      />

      {/* Hero Header (Full Screen Viewport) */}
      <section className="full-screen-hero position-relative">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          {/* Creative floating element */}
          <div className="d-flex justify-content-center mb-4">
            <div className="icon-3d-wrapper" style={{ width: '70px', height: '70px' }}>
              <Mail size={32} className="text-white" />
            </div>
          </div>

          <span className="text-gradient fw-bold text-uppercase tracking-wider mb-2.5 d-block" style={{ fontSize: '0.85rem' }}>Get in Touch</span>
          <h1 className="creative-heading lh-sm mb-3">
            Contact Our <span className="text-gradient">Office</span>
          </h1>
          <p className="lead text-muted-custom mx-auto mb-0" style={{ maxWidth: '600px', fontSize: '1.2rem', lineHeight: '1.6' }}>
            Have a project in mind, want to partner, or need details about our academy? Reach out today.
          </p>
        </div>

        {/* Scroll trigger */}
        <a href="#contact-body" className="scroll-down-btn">
          <ChevronDown size={20} />
        </a>
      </section>

      {/* Subpage Body Content */}
      <div id="contact-body" className="subpage-body">
        {/* Main Section */}
        <section className="section-padding">
          <div className="container">
            <div className="row g-5">
              {/* Left: Contact Info */}
              <div className="col-lg-5">
                <h2 className="fw-bold mb-3 text-white" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.75rem' }}>Corporate Office</h2>
                <p className="text-muted-custom mb-5" style={{ fontSize: '0.95rem' }}>
                  Our support team is active from Monday to Friday, 9:00 AM to 6:00 PM IST. Submit a query and we will reply within 24 hours.
                </p>

                <div className="d-flex gap-3 mb-5">
                  <div className="icon-3d-wrapper" style={{ width: '42px', height: '42px', minWidth: '42px' }}>
                    <Mail size={16} className="text-white" />
                  </div>
                  <div>
                    <h6 className="fw-bold text-white mb-0.5" style={{ fontSize: '0.95rem' }}>Email Queries</h6>
                    <span className="text-muted-custom small">info@algorithmaliens.com</span>
                  </div>
                </div>

                {/* Social links */}
                <div className="d-flex gap-2">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn-outline-custom p-0 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', borderRadius: '50%', minWidth: '36px' }}>
                    <Linkedin size={16} />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn-outline-custom p-0 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', borderRadius: '50%', minWidth: '36px' }}>
                    <Twitter size={16} />
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-outline-custom p-0 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', borderRadius: '50%', minWidth: '36px' }}>
                    <Github size={16} />
                  </a>
                </div>
              </div>

              {/* Right: Contact Form */}
              <div className="col-lg-7">
                <div className="card-custom p-5" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)' }}>
                  <h3 className="fw-bold mb-4 text-white" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.45rem' }}>Send Message</h3>
                  
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
                        <span className="text-danger small mt-1.5 d-block">{errors.fullName.message}</span>
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
                          placeholder="john@company.com"
                          {...register('email', { 
                            required: 'Email address is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address format'
                            }
                          })}
                        />
                        {errors.email && (
                          <span className="text-danger small mt-1.5 d-block">{errors.email.message}</span>
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
                          <span className="text-danger small mt-1.5 d-block">{errors.phone.message}</span>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="mb-4">
                      <label htmlFor="subject" className="form-label form-label-custom">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        disabled={submitting}
                        className={`form-control form-control-custom ${errors.subject ? 'is-invalid border-danger' : ''}`}
                        placeholder="Partnership, Solutions, Academy, etc."
                        {...register('subject', { required: 'Subject is required' })}
                      />
                      {errors.subject && (
                        <span className="text-danger small mt-1.5 d-block">{errors.subject.message}</span>
                      )}
                    </div>

                    {/* Message */}
                    <div className="mb-4">
                      <label htmlFor="message" className="form-label form-label-custom">Message Details</label>
                      <textarea
                        id="message"
                        rows="4"
                        disabled={submitting}
                        className={`form-control form-control-custom ${errors.message ? 'is-invalid border-danger' : ''}`}
                        placeholder="Briefly describe your requirements..."
                        {...register('message', { 
                          required: 'Message content is required',
                          minLength: { value: 10, message: 'Message must be at least 10 characters' }
                        })}
                      />
                      {errors.message && (
                        <span className="text-danger small mt-1.5 d-block">{errors.message.message}</span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="btn-gradient w-100 justify-content-center"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <LoaderCircle className="animate-spin me-2" size={16} />
                          <span>Submitting to Database...</span>
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          <span>Submit Inquiry</span>
                        </>
                      )}
                    </button>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success/Error Floating Toasts */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className={`custom-toast ${toast.type === 'error' ? 'error' : ''}`}
            >
              {toast.type === 'error' ? (
                <AlertTriangle className="text-danger" size={20} />
              ) : (
                <CircleCheck className="text-success" size={20} />
              )}
              <div>
                <h6 className="fw-bold mb-0 text-white" style={{ fontSize: '0.9rem' }}>
                  {toast.type === 'error' ? 'Failed' : 'Success'}
                </h6>
                <p className="mb-0 text-muted-custom small" style={{ fontSize: '0.8rem' }}>{toast.message}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Contact;
