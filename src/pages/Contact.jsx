import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, AlertTriangle, CircleCheck, LoaderCircle } from 'lucide-react';
import { LinkedIn as Linkedin, Twitter, GitHub as Github } from '../components/SocialIcons';
import { motion, AnimatePresence } from 'framer-motion';

import SEO from '../components/SEO';
import { submitContactForm } from '../services/googleSheets';

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message: string }

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const res = await submitContactForm(data);
      if (res.success) {
        showToast(
          'success',
          res.mock 
            ? 'Success! (Demo Mode) Form data simulated successfully.' 
            : 'Thank you! Your message has been saved. We will contact you soon.'
        );
        reset();
      } else {
        showToast('error', 'Submission failed. Please try again.');
      }
    } catch (error) {
      showToast('error', 'Something went wrong. Please check your internet and try again.');
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

      {/* Hero Header */}
      <section className="hero-padding text-center bg-black bg-opacity-25 border-bottom" style={{ borderColor: 'rgba(138, 92, 255, 0.1) !important' }}>
        <div className="container">
          <span className="text-gradient fw-bold text-uppercase tracking-wider mb-2 d-block">Get in Touch</span>
          <h1 className="display-4 fw-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>Contact Our Office</h1>
          <p className="text-muted-custom mx-auto mb-0" style={{ maxWidth: '650px', fontSize: '1.1rem' }}>
            Have a project in mind, want to partner, or need details about our academy? Reach out today.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="section-padding">
        <div className="container">
          <div className="row g-5">
            {/* Left: Contact Info */}
            <div className="col-lg-5">
              <h2 className="fw-bold mb-4 text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>Corporate Office</h2>
              <p className="text-muted-custom mb-5">
                Our support team is active from Monday to Friday, 9:00 AM to 6:00 PM IST. Submit a query and we will get back to you within 24 hours.
              </p>

              <div className="d-flex gap-3 mb-4">
                <div className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 border border-primary p-3" style={{ width: '48px', height: '48px', flexShrink: 0 }}>
                  <Mail className="text-gradient" />
                </div>
                <div>
                  <h6 className="fw-bold text-white mb-1">Email Queries</h6>
                  <span className="text-muted-custom">info@algorithmaliens.com</span>
                </div>
              </div>

              <div className="d-flex gap-3 mb-4">
                <div className="d-flex align-items-center justify-content-center rounded-3 bg-info bg-opacity-10 border border-info p-3" style={{ width: '48px', height: '48px', flexShrink: 0 }}>
                  <Phone className="text-gradient-cyan" />
                </div>
                <div>
                  <h6 className="fw-bold text-white mb-1">Call Support</h6>
                  <span className="text-muted-custom">+91 98765 43210</span>
                </div>
              </div>

              <div className="d-flex gap-3 mb-5">
                <div className="d-flex align-items-center justify-content-center rounded-3 bg-warning bg-opacity-10 border border-warning p-3" style={{ width: '48px', height: '48px', flexShrink: 0 }}>
                  <MapPin className="text-warning" />
                </div>
                <div>
                  <h6 className="fw-bold text-white mb-1">Headquarters</h6>
                  <span className="text-muted-custom">IT Park Road, Tech Innovation Center, Hyderabad, TS, India</span>
                </div>
              </div>

              {/* Responsive Google Maps Embed */}
              <div className="rounded overflow-hidden border mb-4" style={{ height: '220px', borderColor: 'var(--glass-border)' }}>
                <iframe
                  title="AlgorithmAliens Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.4116242371985!2d78.38202931535492!3d17.439999788048256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc49c5e3ab%3A0xe54d3dfed2b3d81b!2sHITEC%20City%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1625064500000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>

              {/* Social links */}
              <div className="d-flex gap-3 mt-4">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-custom p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', borderRadius: '50%' }}>
                  <Linkedin size={18} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-custom p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', borderRadius: '50%' }}>
                  <Twitter size={18} />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-custom p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', borderRadius: '50%' }}>
                  <Github size={18} />
                </a>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="col-lg-7">
              <div className="card-custom p-5" style={{ background: 'linear-gradient(135deg, rgba(23,0,38,0.7) 0%, rgba(10,0,21,0.9) 100%)' }}>
                <h3 className="fw-bold mb-4 text-gradient" style={{ fontFamily: "'Outfit', sans-serif" }}>Send Message</h3>
                
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

                  {/* Subject */}
                  <div className="mb-4">
                    <label htmlFor="subject" className="form-label form-label-custom">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      disabled={submitting}
                      className={`form-control form-control-custom ${errors.subject ? 'is-invalid border-danger' : ''}`}
                      placeholder="Partnership, Careers, Solutions, etc."
                      {...register('subject', { required: 'Subject is required' })}
                    />
                    {errors.subject && (
                      <span className="text-danger small mt-1 d-block">{errors.subject.message}</span>
                    )}
                  </div>

                  {/* Message */}
                  <div className="mb-4">
                    <label htmlFor="message" className="form-label form-label-custom">Message Details</label>
                    <textarea
                      id="message"
                      rows="5"
                      disabled={submitting}
                      className={`form-control form-control-custom ${errors.message ? 'is-invalid border-danger' : ''}`}
                      placeholder="Write your query details here..."
                      {...register('message', { 
                        required: 'Message content is required',
                        minLength: { value: 10, message: 'Message must be at least 10 characters' }
                      })}
                    />
                    {errors.message && (
                      <span className="text-danger small mt-1 d-block">{errors.message.message}</span>
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
                        <LoaderCircle className="animate-spin me-2" size={18} />
                        <span>Submitting to Database...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
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
              <AlertTriangle className="text-danger" size={24} />
            ) : (
              <CircleCheck className="text-success" size={24} />
            )}
            <div>
              <h6 className="fw-bold mb-0 text-white">
                {toast.type === 'error' ? 'Error Alert' : 'Success Confirm'}
              </h6>
              <p className="mb-0 text-muted-custom small">{toast.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Contact;
